const { Model } = require('../models/taskModel');
const dbPool = require('../config/dbPool');

// Mock dbPool.execute
jest.mock('../config/dbPool', () => ({
  execute: jest.fn(),
}));

describe('Model', () => {
  describe.skip('validationForm', () => {
    test('should return errors if title is not filled', () => {
      const errors = Model.validationForm('', 'Some descriptions', false);
      expect(errors).toContain('Title must be filled');
    });

    test('should return errors if descriptions is not filled', () => {
      const errors = Model.validationForm('Some title', '', false);
      expect(errors).toContain('Descriptions must be filled');
    });

    test('should return errors if completed is true', () => {
      const errors = Model.validationForm('Some title', 'Some descriptions', 'true');
      expect(errors).toContain('Completed default must be false');
    });

    test('should return empty array if all fields are valid', () => {
      const errors = Model.validationForm('Some title', 'Some descriptions', false);
      expect(errors).toEqual([]);
    });
  });

  describe.skip('getAllTasks', () => {
    test('should return tasks when query is successful', () => {
      // Mock the successful execution of dbPool.execute
      const mockRows = [
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: true },
      ];
      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      // Define the callback function to capture the results
      const callback = jest.fn();

      // Call the method being tested
      Model.getAllTasks(callback);

      // Check if dbPool.execute is called with the correct query
      expect(dbPool.execute).toHaveBeenCalledWith('SELECT * FROM tasks t', expect.any(Function));

      // Check if the callback function is called with the correct arguments
      expect(callback).toHaveBeenCalledWith(null, mockRows);
    });

    test('should return error when query fails', () => {
      // Mock the failed execution of dbPool.execute
      const mockError = new Error('Database error');
      dbPool.execute.mockImplementation((query, callback) => {
        callback(mockError);
      });

      // Define the callback function to capture the error
      const callback = jest.fn();

      // Call the method being tested
      Model.getAllTasks(callback);

      // Check if dbPool.execute is called with the correct query
      expect(dbPool.execute).toHaveBeenCalledWith('SELECT * FROM tasks t', expect.any(Function));

      // Check if the callback function is called with the error
      expect(callback).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createTasks', () => {
    test('should return error if title and descriptions are the same', () => {
      // Mock the execution of dbPool.execute to return rows with count > 0
      const mockRows = [{ count: 1 }];
      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      // Define the callback function to capture the error
      const callback = jest.fn();

      // Call the method being tested with same title and descriptions
      Model.createTasks('Task 1', 'Task 1 descriptions', false, (err) => {
        callback(err);
      });

      // Check if dbPool.execute is called with the correct query
      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*) AS count'), expect.any(Function));

      // Check if the callback function is called with the error message
      expect(callback).toHaveBeenCalledWith('Title and descriptions must be unique');
    });

    test('should insert new task if title and descriptions are unique', () => {
      // Mock the execution of dbPool.execute to return rows with count = 0
      const mockRows = [{ count: 0 }];
      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      // Define the callback function to capture the result
      const callback = jest.fn();

      // Call the method being tested with unique title and descriptions
      Model.createTasks('Task 2', 'Task 2 descriptions', false, callback);

      // Check if dbPool.execute is called with the correct query
      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*) AS count'), expect.any(Function));

      // Check if dbPool.execute is called with the correct insert query
      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO tasks'), expect.any(Function));

      // Check if the callback function is called with no error
      expect(callback).toHaveBeenCalledWith(null);
    });

    // Add more tests to cover other scenarios
  });
});
