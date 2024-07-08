const router = require('express').Router();
const timeIntervalController=require('../controllers/timeIntervalController.js');

router.post('/',timeIntervalController.addTimeInterval);
router.get('/getAll/:id',timeIntervalController.allTimeInterval)

module.exports=router;