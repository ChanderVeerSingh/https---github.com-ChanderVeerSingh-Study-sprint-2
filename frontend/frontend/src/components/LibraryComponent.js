import React,{useState,useEffect} from 'react'
import LibraryCard from './LibraryCard';

const LibraryComponent = ({allLibraries}) => {
    // console.log("allLibraries>>>",allLibraries);
    // const [allLibraries,setAllLibraries]=useState([]);
    // let allLibraries=JSON.parse(localStorage.getItem('libraries'));
   
    // useEffect(()=>{
    //     setAllLibraries(JSON.parse(localStorage.getItem('libraries')));
    //     console.log("dat>>",allLibraries);
    // },[localStorage.getItem('libraries')]);
  return (
    <div className='mtt-2 w-[80%] mx-auto'>
       
        {
            allLibraries?.map((element,index)=>{
                return (<LibraryCard key={index} details={element}/>)
            })
        }
    </div>
  )
}

export default LibraryComponent