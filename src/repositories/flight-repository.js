const CrudRepository=require('./crud-repository');
const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error')

const { Flight,Airplane,Cities,Airports }=require('../models')
const {Sequelize}=require('sequelize')

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }
   async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where:filter,
            order:sort,
            include:[
                {
                    model:Airplane,
                    require:true,
                    as:'airplaneDetail'

                },
                {
                    model:Airports,
                    required:true,
                    as:'departureAirportDetails',
                    on:{
                        col1:Sequelize.where(Sequelize.col('Flight.departureAirportId'),'=',Sequelize.col('departureAirportDetails.code'))
                    },
                    include:[{
                        model:Cities,
                        required:true,
                        as:'cityDetails'
                    }]
                },
                {
                    model:Airports,
                    required:true,
                    as:'arrivalAirportDetails',
                    on:{
                        col1:Sequelize.where(Sequelize.col('Flight.arrivalAirportId'),'=',Sequelize.col('arrivalAirportDetails.code'))
                    },
                    include:[{
                        model:Cities,
                        required:true,
                        as:'cityDetails'
                    }]
                }
            ]
            
        });
        if(response.length<=0){
            throw new AppError("",StatusCodes.NOT_FOUND)
        }
        return response;
    }
}

module.exports=FlightRepository;