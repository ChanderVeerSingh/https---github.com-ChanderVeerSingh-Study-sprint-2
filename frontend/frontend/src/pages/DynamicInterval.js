import React, { useEffect, useState } from 'react'
import Slider from '@mui/material/Slider';
import { useParams,useSearchParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';

const DynamicInterval = () => {
    const [value,setValue]=useState([6,24]);
    const navigate=useNavigate();
    const {id}=useParams();
    const [roomDetails,setRoomDetails]=useState();
    function valuetext(value) {
        return `${value}°C`;
    }

    function calculatePrice(seat){
        // let dayLeft=moment().endOf('month').fromNow();
        // let temp=dayLeft.split(' ')[1];
        // console.log("dayLeft>>",dayLeft);
        // let x=parseInt(temp);
        let diff=(value[1]-value[0]);
        let p=Math.ceil(((seat?.price)/30)*(diff/18));
        // console.log("selected seat price>>",temp,x,p);
        return p;
    }

    const isAvailable=(seat)=>{
        return seat.is_available;
  }
      
    const marks=[
        {
            value:6,
            label:'6AM'
        },
        {
            value:12,
            label:'12PM'
        },
        {
            value:18,
            label:'6PM'
        },
        {
            value:24,
            label:'12AM'
        }
    ]

    const [seats,setSeats]=useState([]);

    const handleChange=(event,newValue)=>{
        // console.log("HII>>>",newValue);
        setValue(newValue);
    }
    
    useEffect(()=>{
        const fetchDetails=async()=>{
            let temp=await axios(`http://localhost:3000/time-interval/getAll/${id}`);
            temp=temp.data;
            // console.log("temp>>",temp);
            let seats=temp[0].seat;
            console.log("SEAT>>",seats);
            for(let i=0;i<seats.length;i++){
                seats[i].count=0;
            }
            
            const mp=new Map();

            for(let i=0;i<temp.length;i++){
                
                if(temp[i].time.start_time>=value[0] && temp[i].time.start_time<=value[1]){
                  
                    for(let j=0;j<temp[i].seat.length;j++){

                        if(temp[i].seat[j].is_available===false)
                         seats[j].count++;

                        // mp.set(temp[i].seat[j].seat_id,temp[i].seat[j]);
                    }
                }
            }

            for(let j=0;j<seats.length;j++){
                if(seats[j].count>0){
                    seats[j].is_available=false;
                }
                mp.set(seats[j].seat_id,seats[j]);
                seats[j].count=0;
            }

            const temp2=await axios.get(`http://localhost:3000/room/${id}`);
           
           let  res=temp2.data;
           
           for(let i=0;i<res.length;i++){
               for(let j=0;j<res[i].seats.length;j++){
                   if(mp.get(res[i].seats[j].id)){
                       res[i].seats[j]=mp.get(res[i].seats[j].id);
                    }
                }
            }
            console.log("Res>>",res);
            setRoomDetails(res);

            // console.log("RES>>>",res);

            setSeats(seats);
        }

        fetchDetails();
    },[value]);

    const [selectedSeat,setSelectedSeat]=useState(null);

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
}
async function displayRazorpay() {
    // console.log("Selected seat>>",selectedSeat);
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    // creating a new order
    const result = await axios.post("http://localhost:3000/payment/order",{"amount":calculatePrice(selectedSeat)});

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_AUT932oYUL7Lsa", // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "",
        description: "Test Transaction",
        image: "https://pbs.twimg.com/profile_images/1706692842272251905/jK-YCYoj_400x400.png",
        order_id: order_id,
        handler: async function (response) {
            const data = {
                orderCreationId: order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                start_time:value[0],
                end_time:value[1]-1,
                seat_id:selectedSeat.id,
                library_id:selectedSeat.library_id,
                seat_number:selectedSeat.seat_number,
                
                user_id:1,
                user_number:"9999999999",
                room_number:selectedSeat.room_id,
                amount:amount
            };
            console.log("DATA>>>",data);
           let x= await axios.post("http://localhost:3000/payment/success", data);
           if(x.data){
             navigate("../../success")
           }else{
            navigate("../../failure");
           }
           
          
        },
        prefill: {
            name: "Veer",
            email: "veer@gmail.com",
            contact: "9999999999",
        },
        notes: {
            address: "Thanks for payment",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


  return (
    <div className='w-[80%] mx-auto mt-[30px]'>
        <div className='font-bold'>Please select your time slot</div>
         <Slider
        min={6}
        max={24}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={1}
        marks={marks}
        getAriaValueText={valuetext}
      />
      
      <div>
      {roomDetails?.map((element,index)=>(
            <div className='w-[80%] mx-auto' key={index} >
                <div className=''>
                {element.room.is_ac_room ? <div>AC</div>:<div>Non AC</div>}
                
                <div> Room No. {element.room.room_number}</div>
                </div>
                <div className='flex p-2 flex-wrap border-2 rounded-2xl mt-2 mb-4  bg-blue-200 '>
                {element.seats.map((seat,index)=>(
                    <div key={index}>
                    {isAvailable(seat) ? (<div>
                        {selectedSeat?.id==seat.id ? <button onClick={()=> (setSelectedSeat(seat))} className='h-10 w-10 pt-2 pl-2 ml-5 mt-5 bg-green-600 border-2 rounded-full'>{seat.seat_number > 9 ? seat.seat_number: "0"+seat.seat_number}</button>:<button onClick={()=> setSelectedSeat(seat)} className='h-10 w-10 pt-2 pl-2 ml-5 mt-5 bg-white border-2 rounded-full'>{seat.seat_number > 9 ? seat.seat_number: "0"+seat.seat_number}</button>}
                     <div className='ml-7 mt-1 text-[10px]'>₹{calculatePrice(seat)}</div>
                     </div>) :
                    (<div className="h-10 w-10 pt-2 pl-2 ml-5 mt-5 text-white bg-black border-2 rounded-full">{seat.seat_number > 9 ? seat.seat_number: "0"+seat.seat_number}</div>
                    )}
                    
                    </div>
                ))}
                
                </div>
            </div>
        ))}
      </div>
                <div className='mt-4 ml-4 '>{
            selectedSeat===null ? 
            (<div>Please Select seat</div>):
            (<div><div className='flex  justify-around'>
                    <div> {moment().format('ll')}</div>
                    <div>{"---"+">"}</div>
                     <div>{moment().endOf('month').format('ll')} </div>
            </div>
            <div className='flex justify-between w-[80%] mx-auto mt-4 mb-2'>
                <div className='font-bold '>₹ {calculatePrice(selectedSeat)}</div>
                <button className='bg-blue-600  px-2 rounded-[7px] p-1 text-white' onClick={displayRazorpay}>Proceed</button>
            </div>
            </div>
            )
        }
           </div>
    </div>
  )
}

export default DynamicInterval