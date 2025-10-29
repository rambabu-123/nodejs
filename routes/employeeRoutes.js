const express = require('express');;
const router = express.Router();
const employeeController = require('../contorllers/employeeController');
const employee = require('../models/Employee');


//get post put patch delete

router.post('/add-emp',employeeController.createEmployee);
router.get('/all-emps',employeeController.getEmployees);
router.get('/employee/:id',employeeController.singleEmployee);
router.put('/update/:id',employeeController.updateEmployee);
router.delete('/delete/:id',employeeController.deleteEmployee);
module.exports = router;