const express = require('express');
const router = express.Router();

const { getWeather, getHospitalList } = require('../controllers/api');

router.get("/weather/:id", getWeather);
router.get("/hospitals", getHospitalList);


module.exports = router;