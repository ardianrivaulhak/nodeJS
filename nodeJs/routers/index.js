const express = require('express');
const tasksRouter = require('./taskRouter');
const router = express.Router();

router.use(tasksRouter);

module.exports = router;
