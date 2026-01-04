const express = require('express');
const router = express.Router();
const policyController = require('../contorllers/policyController');
const mockAuth = require('../middleware/mockAuth');

// router.use(mockAuth);
router.post('/createpolicy', policyController.createPolicy);
router.get('/search', policyController.searchPolicies);
router.get('/:policyNumber', policyController.getPolicy);
router.put ('/:policyNumber', policyController.updatePolicy);
router.delete('/:policyNumber', policyController.deletePolicy);
router.get('/', policyController.getAllPolicies);
console.log(policyController.createPolicy)
module.exports = router;