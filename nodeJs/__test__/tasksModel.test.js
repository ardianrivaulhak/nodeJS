const { Model } = require('../models/taskModel');
const dbPool = require('../config/dbPool');

// Mock dbPool.execute
jest.mock('../config/dbPool', () => ({
  execute: jest.fn(),
}));

describe('Model', () => {
  describe.skip('validationForm', () => {
    it('should return errors if title is not filled', () => {
      const errors = Model.validationForm('', 'Some descriptions', false);
      expect(errors).toContain('Title must be filled');
    });

    it('should return errors if descriptions is not filled', () => {
      const errors = Model.validationForm('Some title', '', false);
      expect(errors).toContain('Descriptions must be filled');
    });

    it('should return errors if completed is true', () => {
      const errors = Model.validationForm('Some title', 'Some descriptions', 'true');
      expect(errors).toContain('Completed default must be false');
    });

    it('should return empty array if all fields are valid', () => {
      const errors = Model.validationForm('Some title', 'Some descriptions', false);
      expect(errors).toEqual([]);
    });
  });

  describe.skip('getAllTasks', () => {
    it('should return tasks when query is successful', () => {
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

    it('should return error when query fails', () => {
      // Mock the failed execution of dbPool.execute
      const mockError = new Error('Database error');
      dbPool.execute.mockImplementation((query, callback) => {
        callback(mockError);
      });

      const callback = jest.fn();

      // Call the method being tested
      Model.getAllTasks(callback);

      // Check if dbPool.execute is called with the correct query
      expect(dbPool.execute).toHaveBeenCalledWith('SELECT * FROM tasks t', expect.any(Function));

      expect(callback).toHaveBeenCalledWith(mockError);
    });
  });

  describe.skip('createTasks', () => {
    it('should return error if title and descriptions are the same', () => {
      const mockRows = [{ count: 1 }];
      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      const callback = jest.fn();

      Model.createTasks('Task 1', 'Task 1 descriptions', false, (err) => {
        callback(err);
      });

      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*) AS count'), expect.any(Function));

      message;
      expect(callback).toHaveBeenCalledWith('Title and descriptions must be unique');
    });

    it('should insert new task if title and descriptions are unique', () => {
      const mockRows = [{ count: 0 }];
      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      const callback = jest.fn();

      Model.createTasks('Task 2', 'Task 2 descriptions', false, callback);

      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*) AS count'), expect.any(Function));

      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('INSERT INTO tasks'), expect.any(Function));

      expect(callback).toHaveBeenCalledWith(null);
    });
  });
  describe.skip('getTasksById', () => {
    it('should return tasks when query is successful', () => {
      const mockRows = [{ id: 1, title: 'Task 1', completed: true }];

      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      const callback = jest.fn();

      Model.getTasksById(1, callback);

      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM tasks t WHERE id ='), expect.any(Function));

      expect(callback).toHaveBeenCalledWith(null, mockRows);
    });

    it('should return error when query fails', () => {
      const mockError = new Error('Database error');
      dbPool.execute.mockImplementation((query, callback) => {
        callback(mockError);
      });

      const callback = jest.fn();

      Model.getTasksById(2, callback);

      expect(dbPool.execute).toHaveBeenCalledWith(expect.stringContaining('SELECT * FROM tasks t WHERE id ='), expect.any(Function));

      expect(callback).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateTasksById', () => {
    it('should update task when query is successful', () => {
      const id = 1;
      const title = 'Updated Task';
      const descriptions = 'Updated descriptions';
      const completed = true;

      dbPool.execute.mockImplementation((query, callback) => {
        callback(null);
      });

      const callback = jest.fn();

      Model.updateTasksById(id, title, descriptions, completed, callback);

      const expectedQuery = `UPDATE tasks
      SET title = '${title}', descriptions = '${descriptions}', completed = '${completed}'
      WHERE id = ${id}`;
      expect(dbPool.execute).toHaveBeenCalledWith(expectedQuery, expect.any(Function));

      expect(callback).toHaveBeenCalledWith(null);
    });

    it.skip('should handle update error', () => {
      const id = 1;
      const title = 'Updated Task';
      const descriptions = 'Updated descriptions';
      const completed = true;
      const mockError = new Error('Update error');

      dbPool.execute.mockImplementation((query, callback) => {
        callback(mockError);
      });
      const callback = jest.fn();

      Model.updateTasksById(id, title, descriptions, completed, callback);

      const expectedQuery = `UPDATE tasks
      SET title = '${title}', descriptions = '${descriptions}', completed = '${completed}'
      WHERE id = ${id};`;
      expect(dbPool.execute).toHaveBeenCalledWith(expectedQuery, expect.any(Function));
      expect(callback).toHaveBeenCalledWith(mockError);
    });
  });

  describe.skip('deleteTaskById', () => {
    it('should delete task when query is successful', () => {
      const id = 1;
      const mockRows = { affectedRows: 1 };

      dbPool.execute.mockImplementation((query, callback) => {
        callback(null, mockRows);
      });

      const callback = jest.fn();

      Model.deleteTaskById(id, callback);

      const expectedQuery = `DELETE FROM tasks WHERE id = '${id}'`;
      expect(dbPool.execute).toHaveBeenCalledWith(expectedQuery, expect.any(Function));

      expect(callback).toHaveBeenCalledWith(null, mockRows);
    });

    it('should handle delete error', () => {
      // Arrange
      const id = 1;
      const mockError = new Error('Delete error');

      // Mock failed execution of dbPool.execute
      dbPool.execute.mockImplementation((query, callback) => {
        callback(mockError);
      });

      const callback = jest.fn();

      Model.deleteTaskById(id, callback);

      const expectedQuery = `DELETE FROM tasks WHERE id = '${id}'`;
      expect(dbPool.execute).toHaveBeenCalledWith(expectedQuery, expect.any(Function));

      expect(callback).toHaveBeenCalledWith(mockError);
    });
  });
});
