const {AirplaneRepository}=require('../repositories')
const AppError=require('../utils/error/app-error')
const {StatusCodes}=require('http-status-codes');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const airplane=await airplaneRepository.create(data);//data is obj{modelNumber:req.body.modelNumber,capacity:req.body.capacity}
        return airplane;
    } catch (error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
     
}

async function getAllAirplane(){
    try {
        const airplane=await airplaneRepository.getAll();
        return airplane;
    } catch (error) {
        throw new AppError('Cannot get All Airplane object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
     
}

module.exports={
    createAirplane,
    getAllAirplane
}