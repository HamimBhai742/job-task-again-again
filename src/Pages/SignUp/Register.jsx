import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import img from '/images.jpg'
import Swal from 'sweetalert2';
import { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useUser from '../../hooks/useUser';

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`
const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { registerUser, updateUserProfile, googleLogin,logoutUser } = useAuth()
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [userDB] = useUser()
    const [role, setRole] = useState(true)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    console.log(userDB);
    const onSubmit = async (data) => {
        console.log(data);
        const imgeFile = { image: data.photo[0] }
        console.log(imgeFile, 'imgfile');
        const res = await axios.post(Hosting, imgeFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url);
        const email = data.email
        const password = data.password
        const name = data.name
        const businessCategory=data.businessCategory
        const photo = res.data.data.display_url
        const findUser = userDB.find(u => u.email === data.email)
        console.log(findUser);
        if (role) {
            const userData = {
                name,
                email,
                photo,
                role: 'user'
            }

            console.log(userData);
            if (!findUser) {
                const resUser = await axiosPublic.post('/user', userData)
            }
        }
        else if(!role){
            const sellerData = {
                sellerName:name,
                sellerEmail:email,
                photo,
                businessCategory,
                role: 'seller',
                status:'pending'
            }
            if (!findUser) {
                const resSeller = await axiosPublic.post('/user', sellerData)
            }
        }
        registerUser(email, password)
            .then(async (userData) => {
                updateUserProfile(photo, name)
                console.log(userData.user);
                if (userData.user) {
                    Swal.fire({
                        title: "Thank You!",
                        text: "Your register successfully!",
                        icon: "success"
                    });
                    reset()
                    navigate('/login')
                    logoutUser()
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "This email already register!",
                });
            })
    }
    const handelGoogleLogin = () => {
        googleLogin()
            .then(async (datas) => {
                const findUser = userDB.find(u => u.email === datas.user.email)
                console.log(findUser);
                const userData = {
                    name: datas.user.displayName,
                    email: datas.user.email,
                    photo: datas.user.photoURL,
                    role: 'user'
                }
                console.log(userData);
                if (!findUser) {
                    const resUser = await axiosPublic.post('/user', userData)
                }
            })
            .catch((error) => {
                console.log(error);
            })
        // navigate('/')
    }

    const handelShowBtn = () => {
        setShowPass(!showPass)
    }

    const handelRole = (e) => {
        const ro = e.target.value;
        if (ro === 'Seller') {
            setRole(false)
        }
        else {
            setRole(true)
        }
    }
    return (
        <div className="w-full max-w-[500px] p-6 m-auto mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex justify-center mx-auto">
                <img className="w-36" src={img} alt="" />
            </div>

            <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                <div className='my-3' onChange={handelRole}>
                    <div className='flex items-center gap-1'>
                        <input checked type="radio" name="v" value='Customer' />
                        <span className='text-lg font-bold'>Customer</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <input type="radio" name="v" value='Seller' />
                        <span className='text-lg font-bold'>Seller</span>
                    </div>
                </div>
                <div>
                    <label className="block text-gray-800 font-medium">{role ? 'Name' : 'Seller Name'}</label>
                    <input {...register('name')} required type="text" placeholder='Enter your full name' className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className={role ? 'hidden' : 'my-3'}>
                    <label className="block text-gray-800 font-medium">Business Category</label>
                    <select required {...register('businessCategory')} className="select select-bordered block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ">
                        <option disabled selected>Select your category</option>
                        <option value='Electronics'>Electronics</option>
                        <option value='Fashion'>Fashion</option>
                        <option value='Home and Kitchen'>Home and Kitchen</option>
                        <option value='Health and Beauty'>Health and Beauty</option>
                        <option value='Books and Stationery'>Books and Stationery</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-800 font-medium">{role ? 'Email' : 'Business Email'}</label>
                    <input required {...register('email')} type="email" placeholder='Enter your email' className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>

                <div className="mt-4 relative">
                    <div className="flex items-center justify-between">
                        <label for="password" className="block text-gray-800 font-medium">Password</label>
                    </div>

                    <input required {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })} type={showPass ? 'text' : 'password'} placeholder='Enter your password' className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white  border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                    <button className='absolute text-2xl right-3 bottom-3' onClick={handelShowBtn}>{showPass ? <IoMdEyeOff></IoMdEyeOff> : <IoMdEye></IoMdEye>}</button>
                    {
                        errors.password && <p className='text-red-600'>Please provide a strong password</p>
                    }
                </div>
                <div className='mt-4'>
                    <input required {...register('photo')} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                </div>
                <div className="mt-6">
                    <button className="w-full px-6 py-3 text-lg font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Sign Up
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
                <button disabled={!role} onClick={handelGoogleLogin} type="button" className="flex items-center justify-center w-full px-6 py-3 mx-2 text-lg font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                    <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                        <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                        </path>
                    </svg>
                    <span className="hidden mx-2 sm:inline">Sign in with Google</span>
                </button>
            </div>
            <p className="mt-5 text-sm text-center text-gray-400"> Already have an account? <Link to='/login'><a className="font-semibold text-gray-700 hover:text-blue-500  hover:underline">Sign In</a></Link></p>
        </div>
    );
};

export default Register;