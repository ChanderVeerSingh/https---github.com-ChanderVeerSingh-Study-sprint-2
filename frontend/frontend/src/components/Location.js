import axios from 'axios';
import React, { useEffect,useState } from 'react'


const Location = ({selectedLocation,setSelectedLocation}) => {
    const [locations,setLocations]=useState([]);
    // const [selectedLocation,setSelectedLocation]=useState(0);
    useEffect(()=>{

        const fetchDetails=async()=>{
            const temp=await axios.get("http://localhost:3000/location/getAll");
            setLocations(temp.data);
        }
        fetchDetails();
    },[]);

    useEffect(()=>{
        localStorage.setItem("location_id",selectedLocation);
        // console.log("local>>",localStorage.getItem("location_id"));
    },[selectedLocation]);

     
  return (
    <form className="max-w-sm mx-auto w-[80%] mt-[10px]">
  <select onChange={e =>  setSelectedLocation(e.target.value)} value={selectedLocation}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected  value={0} >All locations</option>
    {locations.map((element,index)=>(
        <option  key={index} value={element.id}>{element.name}</option>
    ))}
  </select>
</form>
  )
}

export default Location