const Razorpay = require("razorpay")
const seatControllers=require('../controllers/seatController.js');
const bookingControllers=require('../controllers/bookingController.js')
const paymentDetailsControllers=require('../controllers/paymentDetailsController.js');
const slotSeatControllers=require('../controllers/slotSeatController.js');

let tempDB=[];
setInterval(()=> tempDB=[],60*1000);

const createOrder=async(req,res)=>{

    const instance=new Razorpay({
        key_id : "rzp_test_AUT932oYUL7Lsa",
        key_secret: "4Qt2FP127oR4MwMOpSZNWu2v"
    });
    console.log("price",req.body);
    const options={
        amount:req.body.amount*100,
        currency:"INR",
        receipt:"hello"
    }


    const order=await instance.orders.create(options);

    res.status(200).send(order);
}

const onSuccess=async(req,res)=>{
    
    const {library_id,seat_id,start_time,end_time,user_id,user_number,room_number,seat_number,amount,razorpayPaymentId}=req.body;
    console.log("req.body>>",req.body);
    
    let key=library_id+"-"+seat_id;
    console.log("HELOOOJJIII>>>>>>");
    if(tempDB.includes(key)){
        
        console.log(" Seat is Already Booked :( , Sorry!");
       res.status(200).send(false);
    }else{
       tempDB.push(key);
       console.log("tempDB",tempDB);
    await bookingControllers.addBooking(library_id,start_time,end_time,user_id,user_number,room_number,seat_number,amount);
    console.log("AFTER BOOKING");
    await slotSeatControllers.makeSeatOccupied(start_time,end_time,library_id,seat_number);
    console.log("SLOT SEAT UPDATED");
    await paymentDetailsControllers.addPaymentDetails(amount,razorpayPaymentId);
    console.log("everything is good");
    
    res.status(200).send(true);
     }
   
//   return res.send(`<script>window.location.href="http://localhost:3001/success";</script>`);
}

module.exports={
    createOrder,
    onSuccess
}