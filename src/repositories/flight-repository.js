const CrudRepository=require('./crud-repository');
const {StatusCodes}=require('http-status-codes')
const AppError=require('../utils/error/app-error')

const { Flight,Airplane,Cities,Airports }=require('../models')
const {Sequelize}=require('sequelize')

const {addRowLockOnFlights}=require('./queries');

const db=require('../models')

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

    //Update Seats
    async updateRemainingSeat(flightId,seats,type='dec'){
        const transaction=await db.sequelize.transaction();

        try {
            await db.sequelize.query(addRowLockOnFlights(flightId));
            const flight= await Flight.findByPk(flightId);
            if(type=='dec'){
                await flight.decrement('totalSeats',{by:seats},{transaction:transaction})
            }
            else{
                await flight.increment('totalSeats',{by:seats},{transaction:transaction})
            }
            await transaction.commit();
            return flight;
        } catch (error) {

            await transaction.rollback();
            throw error;            
        }

       
    }
}

module.exports=FlightRepository;