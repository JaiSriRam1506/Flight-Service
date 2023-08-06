const express = require('express');

const airplaneRoutes=require('./airplane-routes')
const cityRoutes=require('./cities-routes')

const router = express.Router();

router.use('/airplanes',airplaneRoutes);
router.use('/city',cityRoutes);

module.exports = router;