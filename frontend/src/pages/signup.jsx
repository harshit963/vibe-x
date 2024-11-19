import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utilis';
import axios , {AxiosError} from 'axios';

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }
        try {
        //     const url = `http://localhost:8080/auth/signup`;
        //     const response = await fetch(url, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(signupInfo)
        //     });
        //     const result = await response.json();
        //     const { success, message, error } = result;
        //     if (success) {
        //         handleSuccess(message);
        //         setTimeout(() => {
        //             navigate('/login')
        //         }, 1000)
        //     } else if (error) {
        //         const details = error?.details[0].message;
        //         console.log('Error Details:', details);
        //         handleError(details);
        //     } else if (!success) {
        //         handleError(message);
        //     }
        //     console.log('Resultss:',result);
        // } catch (err) {
        //     handleError(err);
        // }
    

        const url = `https://vibex-54tj.onrender.com/auth/signup`;
        // const url = `http://localhost:8000/auth/signup`;
        const response = await axios.post(url, signupInfo, {
            headers: {
                'Content-Type': 'application/json'
            },
            // validateStatus: function (status) {
            //     return status >= 200 && status < 300 || status === 409; // Accept 409 as a valid response
            // }
        });
    
        const result = response.data;
    
        // Debugging output to verify the response structure
        console.log('Response:', result);
    
        const { success, message, error } = result;
    
       // console.log('Success:', success, 'Error:', error, 'Message:', message);
    
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else if (error) {
            const details = error?.details?.[0].message; // Ensure safe access
            //console.log('Error Details:', details);
            handleError(details); // Provide a fallback message
        } else {
           // console.log('Fallback Error Handling');
            handleError(message);
        }
    
    } catch (err) {
        // Generic error handling
        let errorMessage = 'An unknown error occurred';
        
        //console.log('Catch Error:', err);
    
        if (err.response && err.response.data && err.response.data.message) {
            errorMessage = err.response.data.message;
        } else if (err.message) {
            errorMessage = err.message;
        }
    
        handleError(errorMessage);
        }
    }
    return (
        <div className='container w-80 md:w-100 my-2 mx-auto'>
            <h1 className='text-black text-5xl font-semibold text-center my-3'>Signup</h1>
            <form className='flex flex-col gap-[10px]' onSubmit={handleSignup}>
                <div className='flex flex-col'>
                    <label htmlFor='name'>Name</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='name'
                        autoFocus
                        placeholder='Enter your name...'
                        value={signupInfo.name}
                         className=' text-black cursor-pointer w-[100%] text-[20px] p-[10px] border-none outline-none border-b-black '
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        onChange={handleChange}
                        type='email'
                        name='email'
                        placeholder='Enter your email...'
                        value={signupInfo.email}
                         className='w-[100%]  text-black cursor-pointer text-[20px] p-[10px] border-none outline-none border-b-black '
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        onChange={handleChange}
                        type='password'
                        name='password'
                        placeholder='Enter your password...'
                        value={signupInfo.password}
                         className='w-[100%]  text-black cursor-pointer text-[20px] p-[10px] border-none outline-none border-b-black '
                    />
                </div>
                <button className='bg-purple-700 text-white cursor-pointer text-[20px] border-none
                rounded-xl p-[10px] my-[10px]' type='submit'>Signup</button>
                <span className='text-black '>Already have an account ?
                    <Link className='text-blue-500 font-semibold' to="/login">Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Signup