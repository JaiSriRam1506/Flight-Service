const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { DateTimeHelper } = require("../utils/helpers");
const AppError = require("../utils/error/app-error");

function validateCreateRequest(req,res,next){

    if(!req.body.flightNumber){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Flight Number is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.airplaneId){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Airplane ID is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.departureAirportId){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['DepartureAirportId is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['ArrivalAirportId is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.arrivalTime){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['ArrivalTime is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.departureTime){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['DepartureTime is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!DateTimeHelper.dateTimeFun(req.body.arrivalTime,req.body.departureTime)){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['ArrivalTime can\'t be Greater DepartureTime is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }

    if(!req.body.price || req.body.price<=0){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['Price is not in proper format or Less than Zero'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.boardingGate){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['BoardingGate is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    if(!req.body.totalSeats ||req.body.totalSeats<=0){
        ErrorResponse.message="Something wrong while Creating Request"
        ErrorResponse.error=new AppError(['TotalSeats is not in proper format or Less than Zero'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    next();

}

function validateUpdateSeatRequest(req,res,next){

    if(!req.body.seats){
        ErrorResponse.message="Something wrong while Updating Seat request"
        ErrorResponse.error=new AppError(['Seat Number is not in proper format'],StatusCodes.BAD_REQUEST);

    return res
              .status(StatusCodes.BAD_REQUEST)
              .json(ErrorResponse)

    }
    next();

}

module.exports={
    validateCreateRequest,
    validateUpdateSeatRequest
}