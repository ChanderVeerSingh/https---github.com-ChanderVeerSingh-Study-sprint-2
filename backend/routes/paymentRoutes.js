const razorpayController=require('../controllers/razorpayController.js');
const router = require('express').Router()

router.post('/order',razorpayController.createOrder);
router.post('/success',razorpayController.onSuccess);

module.exports=router;