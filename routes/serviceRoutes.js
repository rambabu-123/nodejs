const express = require('express');
const router = express.Router();
const serviceController = require('../contorllers/serviceController');

router.post('/',serviceController.createService);
router.get('/allservice',serviceController.getAllServices);
router.get('/service/:id',serviceController.getServiceById);
router.put('/update/:id',serviceController.updateServiceById);
router.delete('/delete/:id',serviceController.deleteServiceById);

module.exports = router;