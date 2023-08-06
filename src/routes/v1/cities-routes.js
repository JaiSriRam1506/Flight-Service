const express=require('express');

const {CitiesController}=require('../../controllers');
const { CitiesMiddleware } = require('../../middlewares');

const router=express.Router();

/*  /api/v1/city POST */
router.post('/',CitiesMiddleware.validateCreateRequest,
                CitiesController.createCity);

/*  /api/v1/city get */
router.get('/',CitiesController.getAllCity);

/*  /api/v1/city/:id POST */
router.patch('/:id',CitiesMiddleware.validateCreateRequest,
                CitiesController.update);

/*  /api/v1/city/:id POST */
router.delete('/:id',CitiesController.destroy);


module.exports=router;