const errorHandler=(err,req,res,next)=>{
    console.log("Error Occured!");
    return res.status(500).json({message:err})
}

module.exports=errorHandler