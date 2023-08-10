const express=require('express');

const {AirportsController}=require('../../controllers');
const { AirportsMiddleware } = require('../../middlewares');

const router=express.Router();

/*  /api/v1/airports POST */
router.post('/',AirportsMiddleware.validateCreateRequest,
                AirportsController.createAirport);

/*  /api/v1/airports getAll */
router.get('/',AirportsController.getAllAirports);

/*  /api/v1/airports/:id get */
router.get('/:id',AirportsController.getAirport);

/*  /api/v1/airports/:id destroy */
router.delete('/:id',AirportsController.destroy);

/*  /api/v1/airports/:id update */
router.patch('/:id',AirportsController.update);

module.exports=router;