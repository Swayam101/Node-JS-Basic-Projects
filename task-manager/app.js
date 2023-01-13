const path=require('path')

const express = require('express')

const mongoConnect=require('./databases/connectDB.js')
const taskRouter=require('./routes/tasks.js')
const notFound=require('./controllers/404.js')
const errorHandler=require('./controllers/errorHandler.js')

require('dotenv').config();

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('./public'))
app.use(express.json())

app.get('/',(req,res)=>{
      res.sendFile(path.join('./','public','task.html'))
})

app.use(taskRouter)

app.use(notFound)

app.use(errorHandler)

mongoConnect(process.env.mongoURI).then(()=>{
      app.listen(port,()=>console.log(`Server @ ${port}`))
})
.catch((err)=>{
      console.log("Can't Connect To Database!");
})
 


//atlasPassword-->  !6cPC-pfZR44wEv
