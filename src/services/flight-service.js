const {FlightRepository}=require('../repositories')
const AppError=require('../utils/error/app-error')
const {StatusCodes}=require('http-status-codes');
const {Op}=require('sequelize');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const flight=await flightRepository.create(data);
        return flight;
    } catch (error) {
        if(error.name==='SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }  
}

async function getAllFlights(query){
    let customFilter={};
    let sortFilter=[];
    const endingTripDate=" 23:59:00"
    //?trips=BLR-DEL
    if(query.trips){
    const [departureAirportId,arrivalAirportId]=query.trips.split('-');
    customFilter.departureAirportId=departureAirportId;
    customFilter.arrivalAirportId=arrivalAirportId;

    //TODO to check if they are not same

    if(query.price){
        [minPrice,maxPrice]=query.price.split('-');
        customFilter.price={
            [Op.between]:[minPrice===undefined?0:minPrice,((maxPrice===undefined?20000:maxPrice))],
        }
    }

    if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers,
        }
    }

    if(query.tripDate){
        const tripDT=new Date(query.tripDate)-24 * 60 * 60 * 1000;
        //const tripT=new TIME(endingTripDate)
        console.log(tripDT);
        customFilter.departureTime={
            [Op.gte]:[tripDT]
        }
    }
    if(query.sort){
        const params=query.sort.split(',')
        const sortFilters=params.map((param)=>param.split('_'));
        sortFilter=sortFilters;
    }

    }
    try {
        const flights=await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError(`Cannot find Flight Between ${customFilter.departureAirportId} & ${customFilter.arrivalAirportId}`, StatusCodes.NOT_FOUND);
    }  

}


module.exports={
    createFlight,
    getAllFlights
}