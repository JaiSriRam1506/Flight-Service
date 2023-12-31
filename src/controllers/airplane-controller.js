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
                .status(error.statusCode)
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
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * get:/airplane/:id
 */
async function getAirplane(req,res){
    try {
        const airplane=await AirplaneService.getAirplane(req.params.id);
            SuccessResponse.data=airplane;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        Logger.error(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * delete:/airplane/:id
 */
async function destroy(req,res){
    try {
        const response=await AirplaneService.destroy(req.params.id);
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        Logger.error(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

/**
 * patch:/airplane/:id
 */
async function update(req,res){
    try {
        const response=await AirplaneService.update(req.params.id,req.body);
            SuccessResponse.data=response;
            return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        Logger.error(error);
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

module.exports={
    createAirplane,
    getAllAirplane,
    getAirplane,
    destroy,
    update
}