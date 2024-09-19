import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useUser from '../../hooks/useUser';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import useMyProducts from '../../hooks/useMyProducts';
import Swal from 'sweetalert2';

const UpdateMyPro = () => {
    const { id } = useParams()
            const navigate = useNavigate();
        const axiosPublic = useAxiosPublic();
        const [userDB] = useUser();
        const { user } = useAuth();
        const [myProducts] = useMyProducts();
        const findUser = userDB.find((u) => u.email === user?.email);
        const findProduct = myProducts.find((my) => my?._id === id);
    console.log(id)
   const {
     register,
     handleSubmit,
     formState: { errors },
     reset,
     getValues,
   } = useForm({
     defaultValues: {
       productName: findProduct?.productName || "",
       brandName: findProduct?.brandName || "",
       productCategory: findUser?.businessCategory || "",
       sellerEmail: findUser?.email || "",
       productPrice: findProduct?.productPrice || "",
       productRating: findProduct?.productRating || "",
       productDescription: findProduct?.productDescription || "",
     },
   });
    const onSubmit = async (data) => {
        const updateProduct = getValues();
      console.log(updateProduct);
      const resProduct = await axiosPublic.patch(
        `/update-my-product/${findProduct?._id}`,
        updateProduct
      );
      console.log(resProduct.data);
      if (resProduct.data.modifiedCount) {
          Swal.fire({
              title: "Thank You!",
              text: "Your product update successfully!",
              icon: "success"
          });
         navigate('/dashboard/my-products');
      }
    }
    return (
      <section className="dark:bg-gray-100 dark:text-gray-900 max-sm:w-[350px] md:mx-5 mx-3 bg-purple-100 rounded-lg lg:mx-16  my-6">
        <div className="space-y-2 col-span-full lg:col-span-1 text-center pt-5">
          <p className="font-cinzel lg:text-4xl text-2xl font-bold">
            Update Product
          </p>
          <p className="text-xs max-w-96 mx-auto font-inter">
            Update your favorite product.Mention the price along with the
            product.Also mention the time and date of adding the product.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          action=""
          className="container p-6 font-lato"
        >
          <fieldset className="grid grid-cols-2 gap-6 p-6 rounded-md dark:bg-gray-50">
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">Brand Name</label>
                <input
                  required
                  {...register("brandName")}
                  type="text"
                  placeholder="Brand Name"
                  defaultValue={findProduct?.brandName}
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>
              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">Product Name</label>
                <input
                  required
                  {...register("productName")}
                  type="text"
                  defaultValue={findProduct?.productName}
                  placeholder="Product Name"
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">
                  Product Category
                </label>
                <input
                  disabled={findUser?.businessCategory}
                  defaultValue={findUser?.businessCategory}
                  required
                  {...register("productCategory")}
                  type="text"
                  placeholder="Product Category"
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 bg-white"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">Seller Email</label>
                <input
                  disabled={findUser?.email}
                  defaultValue={findUser?.email}
                  required
                  {...register("sellerEmail")}
                  type="text"
                  placeholder="Product Category"
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 bg-white"
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">Product Price</label>
                <input
                  required
                  {...register("productPrice", { pattern: /^\d*\.?\d*$/ })}
                  type="text"
                  defaultValue={findProduct?.productPrice}
                  placeholder="Product Price"
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
                {errors.productPrice && (
                  <p className="text-red-600">Please provide only number</p>
                )}
              </div>

              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">Offer Price</label>
                <input
                  required
                  {...register("offerPrice", { pattern: /^\d*\.?\d*$/ })}
                  type="text"
                  defaultValue={findProduct?.offerPrice}
                  placeholder="Offer Price"
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
                {errors.offerPrice && (
                  <p className="text-red-600">Please provide only number</p>
                )}
              </div>

              <div className="col-span-full sm:col-span-3">
                <label className="text-sm font-semibold">Product Rating</label>
                <input
                  required
                  {...register("productRating", {
                    min: 0,
                    max: 5,
                    pattern: /^\d*\.?\d*$/,
                  })}
                  type="text"
                  defaultValue={findProduct?.productRating}
                  placeholder="Product Rating"
                  className="w-full h-12 pl-3 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                />
                {errors.productRating && (
                  <p className="text-red-600">
                    Please provide rating only 0 to 5
                  </p>
                )}
              </div>

              <div className="col-span-full">
                <label className="text-sm font-semibold">
                  Product Description
                </label>
                <textarea
                  required
                  defaultValue={findProduct?.productDescription}
                  {...register("productDescription")}
                  placeholder="Product Description...."
                  className="w-full pt-1 pl-3 h-20 rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300"
                ></textarea>
              </div>

              <div className="col-span-full">
                <button className="btn w-full btn-secondary font-bold text-lg text-slate-800">
                  Update Product
                </button>
              </div>
            </div>
          </fieldset>
        </form>
      </section>
    );
};

export default UpdateMyPro;