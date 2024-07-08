import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
   
  return (
    <div>
        <div className='flex justify-between  w-[80%] mx-auto'>
            <Link to="http://localhost:3001">Study-Sprint</Link>
            {
                localStorage.getItem('is_login') ? (<div>User Profile</div>):
                (<div>
                    Login
                </div>)
}
        </div>
    </div>
  )
}

export default NavBar