const { Logger } = require('../config')
const {AirplaneService}=require('../services')

const {StatusCodes}=require('http-status-codes')

const {ErrorResponse,SuccessResponse}=require('../utils/common')

/**
 * POST:/airplane
 * req-body{modelNumber:'airbus320a',capacity:200}
 */

async function createAirplane(req,res){
    try {
        const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
            });
            SuccessResponse.data=airplane;
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        Logger.error(error);
        ErrorResponse.error=error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }
}

/**
 * get:/airplane
 */
async function getAllAirplane(req,res){
    try {
        const airplane=await AirplaneService.getAllAirplane();
            SuccessResponse.data=airplane;
            return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        Logger.error(error);
        ErrorResponse.error=error;
        return res
                .status(error.StatusCodes)
                .json(ErrorResponse);
    }
}

module.exports={
    createAirplane,
    getAllAirplane
}