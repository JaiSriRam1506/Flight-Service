const express = require('express');

const airplaneRoutes=require('./airplane-routes')
const cityRoutes=require('./cities-routes')
const airportRoutes=require('./airport-routes')
const flightsRoutes=require('./flight-routes')

const router = express.Router();

router.use('/airplanes',airplaneRoutes);
router.use('/city',cityRoutes);
router.use('/airports',airportRoutes);
router.use('/flights',flightsRoutes);

module.exports = router;