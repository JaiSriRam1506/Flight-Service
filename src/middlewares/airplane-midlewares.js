const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req,res,next){

    if(!req.body.modelNumber){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Model no is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    next();

}

module.exports={
    validateCreateRequest
}