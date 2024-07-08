import React ,{useEffect, useState} from 'react'
import libraryLogo from '../assests/library.png'
import { Link } from 'react-router-dom';
import mapLogo from '../assests/gmap.png';

import axios from 'axios'
const LibraryCard = ({details}) => {

  const [hasAc,setHasAc]=useState(false);
  const [rooms,setRooms]=useState([]);
  const [availableSeats,setAvailableSeats]=useState(0);
  const [minPrice,setMinPrice]=useState(100000);

  useEffect(()=>{
    const fetchDetails=async()=>{
      let temp=await axios.get(`http://localhost:3000/room/${details.id}`);
      temp=temp.data;
      setRooms(temp);
      // console.log("temp>>",temp);
      let count=0;
      for(let i=0;i<temp.length;i++){
        if(temp[i].room.is_ac_room===true){
          setHasAc(true);
        }
        
        let seats=temp[i].seats;
        for(let i=0;i<seats.length;i++){
          let {slot_1,slot_2,slot_3,slot_4}=seats[i];
          setMinPrice(Math.min(minPrice,seats[i].price));
          if(slot_1===false && slot_2===false && slot_3===false && slot_4==false){
            count++;
          }
        }
       }

       setAvailableSeats(count);

    }
    fetchDetails();
  },[])
   
  return (
    <Link to={`http://localhost:3001/library/${details.id}`} >
    <div  className='border-2 w-[90%] mx-auto rounded-2xl bg-gray-200 mt-4'>
      <img className="w-[90%]  mx-auto rounded-2xl mt-2" src={libraryLogo}/>
      <div className='font-bold text-center mb-2 underline'>{details.name}</div>
      {hasAc ? <div className='text-center'>AC rooms available</div >:<div className='text-center'>Non AC rooms</div>}
      <div className='flex justify-between w-[90%] mx-auto'>
        <div className='text-sm italic'>starts from</div>
        <div className='flex justify-between'>
        <div className='font-bold'>₹{minPrice}</div>
        <div className='text-sm italic ml-2'> full day slot</div>
        </div>
      </div>
      {/* <div className='flex justify-center mb-5' ><div className='text-green-600 underline' >{availableSeats}</div>{":   " +"full day slots Avialble"}</div> */}
      {/* <div className='flex justify-end mr-2 mt-2 mb-5'>
       <img  className="w-7 h-7" src={mapLogo}/> 
       <div>Paota</div>
      </div> */}
    </div>
    </Link>
  )
}

export default LibraryCard