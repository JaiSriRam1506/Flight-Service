const express=require('express');

const {AirplaneController}=require('../../controllers');
const { AirplaneMiddleware } = require('../../middlewares');

const router=express.Router();

/*  /api/v1/airplanes POST */
router.post('/',AirplaneMiddleware.validateCreateRequest,
                AirplaneController.createAirplane);

/*  /api/v1/airplanes getAll */
router.get('/',AirplaneController.getAllAirplane);

/*  /api/v1/airplanes/:id get */
router.get('/:id',AirplaneController.getAirplane);

/*  /api/v1/airplanes/:id destroy */
router.delete('/:id',AirplaneController.destroy);

/*  /api/v1/airplanes/:id update */
router.patch('/:id',AirplaneController.update);

module.exports=router;