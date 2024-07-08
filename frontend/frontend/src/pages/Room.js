import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams,useSearchParams } from 'react-router-dom';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';


const Room = () => {

    const navigate=useNavigate();
    const [roomDetails,setRoomDetails]=useState([]);
    const {id}=useParams();
    const [queryParameters]=useSearchParams();
    const slot_id=parseInt(queryParameters.get("slot_id"));
    const [selectedSeat,setSelectedSeat]=useState(null);
    const [roomNumber,setRoomNumber]=useState(null);
    
    function calculatePrice(seat){
        let dayLeft=moment().endOf('month').fromNow();
        let temp=dayLeft.split(' ')[1];
        
        let x=parseInt(temp);
        let p=Math.ceil((seat.price)*x/30);
        console.log("selected seat price>>",temp,x,p);
        if(slot_id==1 || slot_id==2 || slot_id==3 ){
            p=p/2;
        }
        return p;
    }

    function isAvailable(seat){
       
        const {slot_1,slot_2,slot_3,slot_4}=seat;
        // if(seat.seat_number%2){
        //     return true;
        // }else{
        //     return false;
        // }
        // console.log(slot_id+"--"+slot_1+"-"+slot_2+"-"+slot_3+"-"+slot_4);
        if(slot_4===true){
            return false;
        }else if((slot_id==4 && slot_1===false && slot_2===false && slot_3===false) || (slot_id===1 && slot_1===false) || (slot_id===2 && slot_2===false) || (slot_id===3 && slot_3===false) ){
           
            return true;
        }

        return false;
    }

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
                slot_id:slot_id,
                seat_id:selectedSeat.id,
                library_id:selectedSeat.library_id,
                seat_number:selectedSeat.seat_number,
                user_id:1,
                user_number:"9999999999",
                room_number:roomNumber,
                amount:amount
            };

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



    useEffect(()=>{

        let fetchDetails=async()=>{
         let temp=await axios.get(`http://localhost:3000/room/${id}`);
         console.log("rooms>>",temp.data);
         setRoomDetails(temp.data);
        }

        fetchDetails();
        
    },[])

  return (
    <div>
        {roomDetails.map((element,index)=>(
            <div className='w-[80%] mx-auto' key={index} >
                <div className=''>
                {element.room.is_ac_room ? <div>AC</div>:<div>Non AC</div>}
                
                <div> Room No. {element.room.room_number}</div>
                </div>
                <div className='flex p-2 flex-wrap border-2 rounded-2xl mt-2 mb-4  bg-blue-200 '>
                {element.seats.map((seat,index)=>(
                    <div key={index}>
                    {isAvailable(seat) ? (<div>
                        {selectedSeat?.id==seat.id ? <button onClick={()=> (setRoomNumber(element.room_number), setSelectedSeat(seat))} className='h-10 w-10 pt-2 pl-2 ml-5 mt-5 bg-green-600 border-2 rounded-full'>{seat.seat_number > 9 ? seat.seat_number: "0"+seat.seat_number}</button>:<button onClick={()=> setSelectedSeat(seat)} className='h-10 w-10 pt-2 pl-2 ml-5 mt-5 bg-white border-2 rounded-full'>{seat.seat_number > 9 ? seat.seat_number: "0"+seat.seat_number}</button>}
                     <div className='ml-7 mt-1 text-[10px]'>{calculatePrice(seat)}</div>
                     </div>) :
                    (<div className="h-10 w-10 pt-2 pl-2 ml-5 mt-5 text-white bg-black border-2 rounded-full">{seat.seat_number > 9 ? seat.seat_number: "0"+seat.seat_number}</div>
                    )}
                    
                    </div>
                ))}
                
                </div>
            </div>
        ))}
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

export default Room