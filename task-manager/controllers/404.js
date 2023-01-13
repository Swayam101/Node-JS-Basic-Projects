const notFound=(req,res)=>{
    res.status(404).json({message:"Page You're Looking For Does Not Exist!"})
}

module.exports=notFound;