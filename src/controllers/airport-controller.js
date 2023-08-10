const { Logger } = require('../config')
const {AirportServices}=require('../services')

const {StatusCodes}=require('http-status-codes')

const {ErrorResponse,SuccessResponse}=require('../utils/common')

/**
 * POST:/airports
 * req-body{name,code,address,cityId}
 */

async function createAirport(req,res){
    try {
        const airport=await AirportServices.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
            });
            SuccessResponse.data=airport;
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
 * get:/airports
 */
async function getAllAirports(req,res){
    try {
        const airports=await AirportServices.getAllAirport();
            SuccessResponse.data=airports;
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
 * get:/airports/:id
 */
async function getAirport(req,res){
    try {
        const airport=await AirportServices.getAirport(req.params.id);
            SuccessResponse.data=airport;
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
 * delete:/airports/:id
 */
async function destroy(req,res){
    try {
        const response=await AirportServices.destroy(req.params.id);
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
 * patch:/airports/:id
 */
async function update(req,res){
    try {
        const response=await AirportServices.update(req.params.id,req.body);
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
    createAirport,
    getAllAirports,
    getAirport,
    destroy,
    update
}