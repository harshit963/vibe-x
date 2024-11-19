import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utilis.js';
import './home.css'

function Login() {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('email and password are required')
        }
        try {
            //const url = `http://localhost:8000/auth/login`;
            const url = `https://vibex-54tj.onrender.com/auth/login`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

    return (
        <div className='container w-80 md:w-100 my-5 mx-auto'>
            <h1 className='text-black text-5xl font-semibold text-center my-8'>Login</h1>
            <form className='flex flex-col gap-[10px]' onSubmit={handleLogin}>
                <div className='flex flex-col'> 
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={loginInfo.email}
                        className='text-black cursor-pointerw-[100%] text-[20px] p-[10px] border-none outline-none border-b-black '
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={loginInfo.password}
                        className=' cursor-pointer w-[100%] text-black text-[20px] p-[10px] border-none outline-none border-b-black '
                    />
                </div>
                <button className='bg-purple-700 text-white cursor-pointer text-[20px] border-none
                rounded-xl p-[10px] my-[10px]' type='submit'>Login</button>
                <span className='text-black'>Does't have an account ?
                    <Link className='text-blue-500 font-semibold' to="/signup">Signup</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login