const { or } = require('sequelize');
const {CitiesRepository}=require('../repositories')
const AppError=require('../utils/error/app-error')
const {StatusCodes}=require('http-status-codes');

const citiesRepository = new CitiesRepository();

async function createCity(data){
    try {
        const city=await citiesRepository.create(data);//data is obj{modelNumber:req.body.modelNumber,capacity:req.body.capacity}
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getAllCities(){
    try {
        const city=await citiesRepository.getAll();
        return city;
    } catch (error) {
        console.log("Service:",error);
        throw new AppError('Cannot get All cities object', StatusCodes.INTERNAL_SERVER_ERROR);
    } 
}


async function destroy(id){
    try {
        const city=await citiesRepository.destroy(id);
        return city;
    } catch (error) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError('City Not Found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function update(id,data){
    try {
        const city=await citiesRepository.update(id,data);
        return city;
    } catch (error) {
        if(error.statusCode===StatusCodes.NOT_FOUND){
            throw new AppError('City Not Found',StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get City object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
     
}

module.exports={
    createCity,
    getAllCities,
    destroy,
    update
}