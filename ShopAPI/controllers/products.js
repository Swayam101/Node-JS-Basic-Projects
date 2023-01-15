const { query } = require('express')
const productModel=require('../models/product.js')

exports.getAllProductsStatic= async (req,res)=>{
  const products=await productModel.find({})
  res.status(200).json({message:"Static Get Route",data:products})
}

exports.getAllProducts= async (req,res)=>{

  const {featured,company,name,sort,fields,numericFilters}=req.query

  const queryObject={}

  if(featured)  queryObject.featured= featured === 'true' ? true : false;

  if(company) queryObject.company=company

  if(name) queryObject.name={$regex:name,$options:'i'}

  let result= productModel.find(queryObject)

  if (sort) {
    const sortList=sort.split(',').join(' ')
    result=result.sort(sortList)
  }
  else{
    result=result.sort('createdAt')
  }

  if(fields){
    const fieldList=fields.split(',').join(' ')
    result=result.select(fieldList)
  }
  if(numericFilters){
    
    const operatorMap={
      '>':'$gt',
      '>=':'$gte',
      '=':'$eq',
       '<':'$lt',
       '<=':'$lte'
    }

    const regEx=/\b(<|>|>=|<=|=)\b/g

    let filters=numericFilters.replace(regEx,match=>`-${operatorMap[match]}-`)

    const options=['price','rating']
    filters=filters.split(',').forEach(item => {
      const [field,operator,value]=item.split('-')
      if (options.includes(field)) {
        queryObject[field]={[operator]:Number(value)}
      }
    });

    console.log(queryObject);

  }

  const page=Number(req.query.page) || 1
  const limit=Number(req.query.limit) || 5
  const skip=(page-1) * limit

  result=result.skip(skip).limit(limit) 

  const products=await result
  
  res.status(200).json({message:`No. Of Products ${products.length}`,data:products,})
}