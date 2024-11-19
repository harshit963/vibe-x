import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Navbar = () => {

  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulate checking login status (replace with your auth logic)
  useEffect(() => {
    const user = localStorage.getItem('loggedInUser'); // Check if user is logged in
    if (user) {
      setIsLoggedIn(true);
      
    }
  }, []);
  const loggedInUser = localStorage.getItem('loggedInUser');
  const firstLetter = loggedInUser ? loggedInUser.charAt(0).toUpperCase() : '';
  const handleLogout = () => {
    // Log out logic here (e.g., remove user token from storage)
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt="" />
            <img onClick={()=>navigate(1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt="" />
        </div>
        <div className='flex items-center gap-4'>
            <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
            <p className='bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer'>Install App</p>
              <div className="flex items-center">
      {!isLoggedIn ? (
        <>
          <p className='bg-purple-500 text-black w-auto mr-5 h-7 px-3 rounded-2xl flex items-center justify-center'>
            <Link to="/login">Login</Link>
          </p>
          <p className='bg-purple-500 text-black w-auto h-7 px-3 rounded-2xl flex items-center justify-center'>
            <Link to="/signup">Signup</Link>
          </p>
        </>
      ) : (
        <div className="flex items-center space-x-4">
          <p className="bg-purple-500 text-black font-bold text-xl w-auto h-7 px-3 rounded-2xl flex items-center justify-center">{firstLetter}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-2xl">
            Logout
          </button>
        </div>
      )}
    </div>
        </div>
      </div>
      <div className='flex items-center gap-2 mt-4'>
            <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>
      </div>
    </>
  )
}

export default Navbar
