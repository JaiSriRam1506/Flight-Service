const express=require('express');

const {FlightsController}=require('../../controllers');
const { FlightMiddleware } = require('../../middlewares');

const router=express.Router();

/*  /api/v1/flights POST */
router.post('/',FlightMiddleware.validateCreateRequest,
                FlightsController.createFlight);
/*  /api/v1/flights?trips=BOM-DEL get */
router.get('/',FlightsController.getAllFlights);

/*  /api/v1/flights/:id */
router.get('/:id',FlightsController.getFlight);

/*  /api/v1/flights/:id/seats */
router.patch('/:id/seats',  FlightMiddleware.validateUpdateSeatRequest,
                            FlightsController.updateSeats);

module.exports=router;