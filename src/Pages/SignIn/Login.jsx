import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import img from '/images.jpg'
import Swal from 'sweetalert2';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useUser from '../../hooks/useUser';

const Login = () => {
    const { loginUser, googleLogin } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()
    const [userDB] = useUser()
    const onSubmit = async (data) => {
        console.log(data);
        const email = data.email
        const password = data.password
        const findSl = userDB.find(s => s.sellerEmail === email)
        if (findSl?.status === 'pending') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You cannot login because your ID has not been activated by admin!",
            });
            return
        }
        loginUser(email, password)
            .then(userData => {
                console.log(userData.user);
                if (userData.user) {
                    Swal.fire({
                        title: "Thank You!",
                        text: "Your login successfully!",
                        icon: "success"
                    });
                    reset()
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Incorrect your email or password!",
                });
            })
    }

    const handelGoogleLogin = () => {
        googleLogin()
        navigate('/')
    }
    const handelShowBtn = () => {
        setShowPass(!showPass)
    }
    return (
        <div className="w-full max-w-[500px] p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
                <img className="w-36" src={img} alt="" />
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="block text-gray-800 font-medium">Email</label>
                    <input required {...register('email')} type="email" placeholder='Enter your email' className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-4 relative">
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-gray-800 font-medium">Password</label>
                    </div>

                    <input required {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} type={showPass ? 'text' : 'password'} placeholder='Enter your password' className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    <button className='absolute text-2xl right-3 bottom-3' onClick={handelShowBtn}>{showPass ? <IoMdEyeOff></IoMdEyeOff> : <IoMdEye></IoMdEye>}</button>
                </div>
                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Sign In
                    </button>
                </div>
            </form>

            <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                    or login with Social Media
                </a>

                <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
            </div>

            <div className="flex items-center mt-6 -mx-2">
                <button onClick={handelGoogleLogin} type="button" className="flex items-center justify-center w-full px-6 py-3 mx-2 text-lg font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                    <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                        </path>
                    </svg>
                    <span className="hidden mx-2 sm:inline">Sign in with Google</span>
                </button>
            </div>
            <p className="mt-5 text-sm text-center text-gray-400"> Don't have an account? <Link to='/register'><a className="font-semibold text-gray-700 hover:text-blue-500  hover:underline">Sign Up</a></Link></p>
        </div>
    );
};

export default Login;