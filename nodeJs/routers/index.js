const express = require('express');
const TaskController = require('../controller/TaskController');
const router = express.Router();

router.get('/', TaskController.getAllTask);
router.post('/add', TaskController.createTask);

module.exports = router;
