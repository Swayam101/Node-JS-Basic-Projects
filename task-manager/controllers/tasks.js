const tasksModel = require('../models/tasks.js');

exports.getAllTasks=async (req, res) => {
    const tasks = await tasksModel.find({})
    res.json({ message: "Tasks Found", tasks })
}

exports.createTask=async (req, res) => {
    const task = req.body;
    const newTask = await tasksModel.create(task)
   return res.status(201).json(newTask)    
}

exports.updateTask=async (req,res) =>{
    const id=req.params.id
    console.log(req.body);
    const updated=await tasksModel.findOneAndUpdate({_id:id},req.body)
    res.status(200).json({message:"Task Updated Successfully!",task:updated})
}

exports.getTask=async (req,res)=>{
   const id= req.params.id;
   const task =await tasksModel.findOne({_id:id})
   res.status(200).json({task})
}

exports.deleteTask=async (req,res)=>{
    const id=req.params.id;
    const deleted=await tasksModel.findOneAndDelete({_id:id})
    res.status(200).json({message:"Task Added Successfully!",task:deleted})
}

