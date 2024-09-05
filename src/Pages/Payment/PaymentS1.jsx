import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MdOutlineAlternateEmail, MdOutlinePayment } from 'react-icons/md';
import { PiCardholderThin } from 'react-icons/pi';
import useMyCarts from '../../hooks/useMyCarts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { RiNumbersFill } from 'react-icons/ri';
import useAuth from '../../hooks/useAuth';

const PaymentS1 = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [shipping, setShipping] = useState('')
    const [myCarts, refetch] = useMyCarts()
    const subTotalPrice = myCarts.reduce((p, q) => p + q.productPrice, 0)
    const [shippingCrarge, setShippingCharge] = useState(0.00)
    const [plcBtn, setPlcBtn] = useState(false)

    const handelShippingBtn = (e) => {
        setShipping()
        setShipping(e.target.value);
        if (e.target.value === 'inDhaka') {
            setShippingCharge()
            setShippingCharge(6.99)
            setPlcBtn(true)
        }
        else if (e.target.value === 'outDhaka') {
            setShippingCharge()
            setShippingCharge(12.99)
            setPlcBtn(true)
        }
    }

    parseFloat(shippingCrarge)
    const totalPrice = parseFloat(subTotalPrice + shippingCrarge)
    // console.log(user.photoURL);

    const onSubmit = async (data) => {
        console.log(data, totalPrice);
        const payDetails = {
            cardHolder: data.cardHolder,
            amount: totalPrice,
            email: user?.email,
            state: data.state,
            billingAddress: data.billingAddress,
            imgCu: user?.photoURL
           
        }

        const res = await axiosPublic.post('/payment', payDetails)
        // console.log(res.data.paymentUrl);

        const rrr = await axiosPublic.post('/pay-setp', {
            status: 'pending',
            stepEmail: user?.email
        })
        const redrictUrl = res.data.paymentUrl
        if (redrictUrl) {
            window.location.replace(redrictUrl)
        }
    }
    return (
        <div className='bg-gray-100 max-w-[700px] p-10 mx-auto'>
            <div className='flex flex-col gap-3' onChange={handelShippingBtn}>
                {/* <input type="radio" name="radio-1" className="radio" defaultChecked /> */}
                <div className={shipping === 'inDhaka' ? 'border-2 border-gray-700 rounded-md p-3 flex justify-between items-center' : 'border border-gray-400 rounded-md p-3 flex justify-between items-center'}>
                    <div>
                        <h3 className='text-lg font-semibold'>Inside Dhaka</h3>
                        <p className='text-gray-600'>Delivery: 2 - 3 Days</p>
                    </div>
                    <input value='inDhaka' type="radio" id='radio1' name="radio-1" className="radio" onSelect={true} />
                </div>
                <div className={shipping === 'outDhaka' ? 'border-2 border-gray-700 rounded-md p-3 flex justify-between items-center' : 'border border-gray-400 rounded-md p-3 flex justify-between items-center'}>
                    <div>
                        <h3 className='text-lg font-semibold'>Outside Dhaka</h3>
                        <p className='text-gray-600'>Delivery: 3 - 7 Days</p>
                    </div>
                    <input value='outDhaka' type="radio" id='radio2' name="radio-1" className="radio" />
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 mt-5'>
                <div>
                    <h3 className='text-xl font-semibold'>Delivery Details</h3>
                </div>
                <div className="relative">
                    <label className="text-sm font-semibold">Name</label>
                    <input required {...register('cardHolder', { required: true, pattern: /^[A-Za-z\s]+$/ })} type="text" placeholder="Your Full Name" className="w-full mt-1 h-12 pl-10 rounded-md bg-white border-[1px] border-gray-400" />
                    <span className='absolute left-3 bottom-3 text-xl text-gray-500'>
                        <PiCardholderThin />
                    </span>
                </div>
                {errors.cardHolder &&
                    <p role="alert" className='-mt-2 text-red-600 text-sm'>Please provide your valid name!</p>
                }
                <div className="relative">
                    <label className="text-sm font-semibold">Email</label>
                    <input required {...register('email')} type="email" placeholder="Your email@gmail.com" defaultValue={user?.email} disabled={user} className="w-full mt-1 h-12 pl-10 rounded-md bg-white border-[1px] border-gray-400" />
                    <span className='absolute left-3 bottom-3 text-xl text-gray-500'>
                        <MdOutlineAlternateEmail></MdOutlineAlternateEmail>
                    </span>
                </div>
                {errors.email &&
                    <p role="alert" className='-mt-2 text-red-600 text-sm'>Please provide your valid email!</p>
                }
                <div className="relative">
                    <label className="text-sm font-semibold">Number</label>
                    <input required {...register('number', { required: true, pattern: /^(?:\+88|88)?(01[3-9]\d{8})$/ })} type="text" placeholder="Your phone number" className="w-full mt-1 h-12 pl-10 rounded-md bg-white border-[1px] border-gray-400" />
                    <span className='absolute left-3 bottom-3 text-xl text-gray-500'>
                        <RiNumbersFill />
                    </span>
                </div>
                {errors.number &&
                    <p role="alert" className='-mt-2 text-red-600 text-sm'>Please provide your valid phone number!</p>
                }
                {/* <div>
                    <label className="text-sm font-semibold">Card Details</label>
                    <div className='grid grid-cols-4 gap-2'>
                        <div className="relative col-span-2 ">
                            <input required {...register('cardNumber', { required: true })} type="text" placeholder="Youremail@gmail.com" className="w-full mt-1 h-12 pl-10 rounded-md bg-white border-[1px] border-gray-400" />
                            <span className='absolute left-3 bottom-3 text-xl text-gray-500'>
                                <MdOutlinePayment />
                            </span>
                        </div>
                        <div className="relative">
                            <input required {...register('cardExpDate', { required: true })} type="date" placeholder="MM/YY" className="w-full mt-1 h-12 pl-3 rounded-md bg-white border-[1px] border-gray-400" />
                        </div>
                        <div className="relative">
                            <input required {...register('CVC', { required: true })} type="nu" placeholder="CVC" className="w-full mt-1 h-12 pl-3 rounded-md bg-white border-[1px] border-gray-400" />
                        </div>
                    </div>
                </div> */}
                <div>
                    <label className="text-sm font-semibold">Billing Address</label>
                    <div className='grid grid-cols-4 gap-2'>
                        <div className="relative col-span-2 ">
                            <input required {...register('billingAddress', { required: true })} type="text" placeholder="Full Address" className="w-full mt-1 h-12 pl-10 rounded-md bg-white border-[1px] border-gray-400" />
                            <span className='absolute left-3 bottom-3 w-6 h-6'>
                                <img src="/bangladesh.png" alt="" />
                            </span>
                        </div>
                        {errors.firstName?.type === "required" &&
                            <p role="alert" className='-mt-2 text-red-600 text-sm'>Billing address is required</p>
                        }
                        <div className="relative">
                            {/* <input required {...register('email', { required: true })} type="text" placeholder="MM/YY" /> */}
                            <select {...register('state')} className="w-full mt-1 h-12 px-3 rounded-md bg-white border-[1px] border-gray-400">
                                <option disabled selected>State</option>
                                <option disabled={shipping === 'inDhaka' ? false : true} value="Dhaka">Dhaka</option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Chattogram">Chattogram</option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Barishal">Barishal</option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Khulna">Khulna</option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Rangpur">Rangpur</option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Rajshahi">Rajshahi</option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Mymensingh">Mymensingh </option>
                                <option disabled={shipping === 'inDhaka' ? true : false} value="Sylhet">Sylhet </option>
                            </select>
                        </div>
                        <div className="relative">
                            <input required {...register('ZIP', { required: true, pattern: /^\d{1,5}$/ })} type="text" placeholder="ZIP" className="w-full mt-1 h-12 pl-3 rounded-md bg-white border-[1px] border-gray-400" />
                            {errors.ZIP &&
                                <p role="alert" className='text-red-600 text-sm'>ZIP code only number </p>
                            }
                        </div>

                    </div>
                </div>
                <hr />
                <div>
                    <h4 className='flex items-center justify-between text-lg font-semibold'>Subtotal <span>${subTotalPrice}</span></h4>
                    <h4 className='flex items-center justify-between text-lg font-semibold mt-1'>Shipping <span>${shippingCrarge}</span></h4>
                </div>
                <hr />
                <div>
                    <h4 className='flex items-center justify-between text-lg font-semibold mt-1'>Total <span>${totalPrice.toFixed(2)}</span></h4>
                </div>
                <div>
                    <button className={plcBtn ? 'w-full btn btn-info' : 'w-full btn btn-disabled'}>Placeholder</button>
                </div>
            </form>
        </div>
    );
};

export default PaymentS1;