const express=require('express');

const {FlightsController}=require('../../controllers');
const { FlightMiddleware } = require('../../middlewares');

const router=express.Router();

/*  /api/v1/flights POST */
router.post('/',FlightMiddleware.validateCreateRequest,
                FlightsController.createFlight);
/*  /api/v1/flights?trips=BOM-DEL get */
router.get('/',FlightsController.getAllFlights);

module.exports=router;