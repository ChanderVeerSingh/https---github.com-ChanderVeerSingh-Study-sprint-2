import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar';
import axios from 'axios';
import LibraryCard from '../components/LibraryCard';
import LibraryComponent from '../components/LibraryComponent';
import Location from '../components/Location';
import Slider from '@mui/material/Slider';


const Home = () => {
  
    const [value,setValue]=useState([6,24]);
    const [allLibraries,setAllLibraries] = useState([]);
    const [selectedLocation,setSelectedLocation]=useState(0);


   
    useEffect(()=>{
        let temp;

        const fetchDetails=async()=>{
            
              temp=await axios.get("http://localhost:3000/library/getAll");
            
            temp=temp.data;
          
            let location_id=localStorage.getItem("location_id");
           
            if(!location_id || location_id==0){
                setAllLibraries(temp);
            }else{
                setAllLibraries(temp.filter((element=> location_id==element.location_id)))
            }
            console.log("library>>>id",allLibraries);
            
            // let temp2=await axios(`http://localhost:3000/time-interval/getAll/${id}`);
           
        }
        
        fetchDetails();
        
        
    },[selectedLocation,value]);
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
    const handleChange=(event,newValue)=>{
      // console.log("HII>>>",newValue);
      setValue(newValue);
  }
  function valuetext(value) {
    return `${value}°C`;
}

  return (
    <div>
        <NavBar/>
        <Location selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation}/>
        {/* <div className='w-[70%] mx-auto'>
        <div className='font-bold mt-[10px]'>Search libraries on  your NEED!</div>
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
        </div> */}
        <LibraryComponent allLibraries={allLibraries}/>
    </div>
  )
}

export default Home