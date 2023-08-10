const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req,res,next){

    if(!req.body.name){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Airport name is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.code){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Airport code is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.cityId){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Airport cityId is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    next();

}

module.exports={
    validateCreateRequest
}