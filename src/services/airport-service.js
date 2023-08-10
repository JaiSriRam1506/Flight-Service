const {AirportRepository}=require('../repositories')
const AppError=require('../utils/error/app-error')
const {StatusCodes}=require('http-status-codes');

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const airport=await airportRepository.create(data);
        return airport;
    } catch (error) {
        if(error.name==='SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getAllAirport(){
    try {
        const airports=await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError('Cannot get All Airports object', StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}

async function getAirport(id){
    try {
        const airport=await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError('Airport Not Found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function destroy(id){
    try {
        const response=await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError('Airport Not Found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function update(id,data){
    try {
        const airport=await airportRepository.update(id,data);
        return airport;
    } catch (error) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError('Airport Not Found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
     
}

module.exports={
    createAirport,
    getAllAirport,
    getAirport,
    destroy,
    update
}