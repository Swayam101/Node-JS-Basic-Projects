class CustomAPIError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode
    }
}

const createCustomError=(msg,stcode)=>{
    return new CustomAPIError(msg,stcode)
}

module.exports={createCustomError,CustomAPIError}