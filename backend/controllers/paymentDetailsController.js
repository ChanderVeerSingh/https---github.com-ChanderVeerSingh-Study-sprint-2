const moment = require('moment');
const db = require('../models')

const Payment_detail = db.payment_detail;

const addPaymentDetails=async(price_paid,payment_id)=>{
    const payment_details=await Payment_detail.create({price_paid,payment_id,payment_time:new Date()});
    return payment_details;
}

module.exports={
    addPaymentDetails
}