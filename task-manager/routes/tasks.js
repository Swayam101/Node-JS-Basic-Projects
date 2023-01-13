const router = require('express').Router()

const asyncWrapper=require('../utils/async.js')


const { getAllTasks , createTask, updateTask, getTask, deleteTask }=require('../controllers/tasks.js')

router.route('/api/v1/tasks')
.get(asyncWrapper(getAllTasks))
.post(asyncWrapper(createTask))

router.route('/api/v1/tasks/:id').get(asyncWrapper(getTask)).patch(asyncWrapper(updateTask)).delete(asyncWrapper(deleteTask))



module.exports = router



