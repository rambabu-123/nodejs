const express = require('express');
const router = express.Router();

const locationController = require('../contorllers/locationsController');
router.get('/locations/hierarchy', locationController.getLocationHierarchy);
router.post('/states',locationController.createState);
router.post('/districts/bulk', locationController.bulkCreateDistricts);
router.post('/mandals/bulk', locationController.bulkCreateMandals);
// BULK STATES
router.post('/states/bulk', locationController.bulkCreateStates);

// STATES
router.get('/states', locationController.getStates);

// DISTRICTS BY STATE
router.get('/states/:stateCode/districts', locationController.getDistrictsByState);

// MANDALS BY DISTRICT
router.get('/districts/:districtCode/mandals', locationController.getMandalsByDistrict);


// Debug (optional)
console.log(locationController.getStates);

module.exports = router;
