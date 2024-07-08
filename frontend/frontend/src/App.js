
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import LibraryDetails from './pages/LibraryDetails';
import Room from './pages/Room';
import Success from './pages/Success';
import FailPage from './pages/FailPage';
import DynamicInterval from './pages/DynamicInterval';
function App() {
  return (
   
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/library/:id" element={<LibraryDetails/>}/>
        <Route path="/room/:id" element={<Room/>}/>
        <Route path='/success' element={<Success/>}/>
        <Route path='/failure' element={<FailPage/>}/>
        <Route path='/dynamic-slot/:id'  element={<DynamicInterval/>}/>
        
    </Routes>
    </BrowserRouter>
  
  );
}

export default App;
