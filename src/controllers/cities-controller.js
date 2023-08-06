const { Logger } = require('../config')
const {CitiesServices}=require('../services')

const {StatusCodes}=require('http-status-codes')

const {ErrorResponse,SuccessResponse}=require('../utils/common')

/**
 * POST:/city
 * req-body{cities:Kolkata}
 */

async function createCity(req,res){
    try {
        const city=await CitiesServices.createCity({
            city:req.body.city
            });
            SuccessResponse.data=city;
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
 * get:/cities
 */
async function getAllCity(req,res){
    try {
        const cities=await CitiesServices.getAllCities();
            SuccessResponse.data=cities;
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
 * get:/city/:id
 */
async function destroy(req,res){
    try {
        const response=await CitiesServices.destroy(req.params.id);
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
 * patch:/city/:id
 */
async function update(req,res){
    try {
        const response=await CitiesServices.update(req.params.id,req.body);
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
    createCity,
    getAllCity,
    update,
    destroy
}