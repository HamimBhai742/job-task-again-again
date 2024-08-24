import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY
const Hosting = `https://api.imgbb.com/1/upload?key=${API_KEY}`
const AddProduct = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic()
    const onSubmit = async (data) => {
        console.log(data);
        const imgeFile = { image: data.productImg[0] }
        console.log(imgeFile, 'imgfile');
        const res = await axios.post(Hosting, imgeFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log(res.data.data.display_url);
        const timeAndDate = new Date().toLocaleString()
        const time = new Date()

        const addProduct = {
            productName: data.productName,
            brandName: data.brandName,
            productImg: res.data.data.display_url,
            productRating: data.productRating,
            productCategory: data.productCategory,
            productDescription: data.productDescription,
            productPrice: parseFloat(data.productPrice),
            productAddingTime: timeAndDate,
            productDaTa: time

        }
        const resProduct = await axiosPublic.post('/products', addProduct)
        console.log(resProduct.data);
        if (resProduct.data.insertedId) {
            Swal.fire({
                title: "Thank You!",
                text: "Your product added successfully!",
                icon: "success"
            });
            reset()
        }
    }
    return (
        <section className="dark:bg-gray-100 dark:text-gray-900 max-sm:w-[350px] md:mx-5 mx-3 bg-teal-100 rounded-lg lg:mx-16  my-6">
            <div className="space-y-2 col-span-full lg:col-span-1 text-center pt-5">
                <p className="font-cinzel lg:text-4xl text-2xl font-bold">Add Product</p>
                <p className="text-xs max-w-96 mx-auto font-inter">Add your favorite product.Mention the price along with the product.Also mention the time and date of adding the product.</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="container p-6 font-lato">
                <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md dark:bg-gray-50">
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Brand Name</label>
                            <input required {...register('brandName')} type="text" placeholder="Brand Name" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Product Name</label>
                            <input required {...register('productName')} type="text" placeholder="Product Name" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Product Category</label>
                            <select required {...register('productCategory')} className="select select-bordered w-full ">
                                <option disabled selected>Select your category</option>
                                <option value='Electronics'>Electronics</option>
                                <option value='Fashion'>Fashion</option>
                                <option value='Home and Kitchen'>Home and Kitchen</option>
                                <option value='Health and Beauty'>Health and Beauty</option>
                                <option value='Books and Stationery'>Books and Stationery</option>
                            </select>
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Product Price</label>
                            <input required {...register("productPrice", { pattern: /^\d*\.?\d*$/ })} type="text" placeholder="Product Price" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                            {
                                errors.productPrice && <p className='text-red-600'>Please provide only number</p>
                            }
                        </div>

                        <div className="col-span-full">
                            <label className="text-sm font-semibold">Product Description</label>
                            <textarea required {...register('productDescription')} placeholder='Product Description....' className="w-full pt-1 pl-3 h-20 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"></textarea>
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <label className="text-sm font-semibold">Product Rating</label>
                            <input required {...register("productRating", { min: 0, max: 5, pattern: /^\d*\.?\d*$/ })} type="text" placeholder="Product Rating" className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300" />
                            {
                                errors.productRating && <p className='text-red-600'>Please provide rating only 0 to 5</p>
                            }
                        </div>

                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="state" className="text-sm font-semibold">Product Image</label>
                            <input required {...register('productImg')} type="file" className="file-input w-full" />

                        </div>

                        <div className="col-span-full">
                            <button className='btn w-full btn-accent font-bold text-lg text-slate-800'>Add Product</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    );
};

export default AddProduct;