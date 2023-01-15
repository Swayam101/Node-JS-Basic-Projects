require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()


const notFound=require('./middleware/not-found.js')
const errorHandler=require('./middleware/error-handler.js')
const mongoConnect=require('./db/connect.js')
const productRouter=require('./routes/products.js')

const port = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => res.send('<h1>Store API</h1><a href="/api/v1/products">Products Route</a>'))

app.use('/api/v1/products',productRouter)

app.use(notFound)
app.use(errorHandler)


mongoConnect(process.env.MONGO_URI).then(()=>{
    app.listen(port,()=>console.log("Server Running!"))
}).catch((err)=>{
    console.log(err);
})
