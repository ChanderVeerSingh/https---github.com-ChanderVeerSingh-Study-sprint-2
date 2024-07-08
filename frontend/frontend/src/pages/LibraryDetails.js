import React, { useEffect,useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import axios from 'axios'

import mapLogo from '../assests/gmap.png';
import ReactPlayer from 'react-player/youtube'



const LibraryDetails = () => {
 
    const {id}=useParams();
   
    const [libraryDetails,setLibraryDetails]=useState({});

    const [facilites,setFacilites]=useState([]);
    useEffect(()=>{
        const fetchDetails=async ()=>{
            console.log("HIII>>>");
            const temp=await axios.get(`http://localhost:3000/library/${id}`);
            setLibraryDetails(temp.data);
            console.log("temp--->",temp.data);
            if(temp.data.facilities)
            setFacilites(temp.data.facilities.split(","));
        }
        fetchDetails();
        
    },[id]);

  return (
    <div className='mt-5px '>
        <div className=' mt-4 text-center text-lg font-bold mb-4'>LibraryDetails</div>
        <div className='w-[70%] mx-auto'>
            <div className='font-semibold'>Facilites</div>
            <div className='bg-gradient-to-r mx-auto mt-2 p-2 from-green-400 to-blue-500 mt-5px rounded-2xl '>
                {
                    facilites.map((facility,index)=>(
                        <div className=' ml-4 flex ' key={index}>
                            <div className=' mt-2 mr-4  w-2 h-2 text-center bg-blue-600 rounded-xl'></div>
                            <div>{facility}</div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="mx-auto w-[70%] mt-6">
            <div className='font-semibold mb-2'>Virtual Tour</div>
            <ReactPlayer url='https://www.youtube.com/watch?v=Bb-XDbiWLtw'  controls={false} volume={0} width={300} height={150} playing={false} rounded-2xl/>
        </div>

        <div className="mx-auto mt-4 w-[70%]">
            <div className='font-semibold '>Time Slots</div>
            <Link to={`http://localhost:3001/dynamic-slot/${id}`}>
               <div className=' bg-sky-500/100 text-center mt-2 rounded-2xl border-2 p-2 w-[100%]' >As per your need</div>
            </Link>
            <Link to={`http://localhost:3001/room/${id}?slot_id=1`}>
               <div className='mt-2 bg-sky-500/100 text-center rounded-2xl border-2 p-2 w-[100%]'>6AM-12PM</div>
            </Link>
            <Link to={`http://localhost:3001/room/${id}?slot_id=2`}>
               <div className='bg-sky-500/100 mt-2 text-center rounded-2xl border-2 p-2 w-[100%]'>12PM-6PM</div>
            </Link>
            <Link to={`http://localhost:3001/room/${id}?slot_id=3`}>
               <div className='bg-sky-500/100 text-center mt-2 rounded-2xl border-2 p-2 w-[100%]' >6PM-12AM</div>
            </Link>
            <Link to={`http://localhost:3001/room/${id}?slot_id=4`}>
               <div className=' bg-sky-500/100 text-center mt-2 rounded-2xl border-2 p-2 w-[100%]' >FULL-DAY</div>
            </Link>
        </div>
        
    </div>
  )
}

export default LibraryDetails