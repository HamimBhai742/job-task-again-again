import React from 'react';
import ReactStars from 'react-stars';
import useProducts from '../../hooks/useProducts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useMyCarts from '../../hooks/useMyCarts';

const ProductsCard = ({ product }) => {
    // console.log(product);
    const [myCarts, refetch] = useMyCarts()
    const axiosPublic = useAxiosPublic()
    const [products] = useProducts()
    const { productRating, productAddingTime, _id, productPrice, brandName, productName, productImg, productDescription, productCategory } = product
    console.log(products);
    const handelAddToCartBtn = async (id) => {
        // console.log(id);
        const findMyItem = products.find(product => product._id === id)
        const findM = myCarts.find(product => product.productId === id)
        const { productName, productImg, productPrice, productQuantity } = findMyItem
        const addCart = {
            productName,
            productImg,
            productPrice,
            productId: id,
            productQuantity: 1
        }
        // console.log(findM);
        if (!findM) {
            const res = await axiosPublic.post('/add-to-cart', addCart)
            console.log(res.data);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Thank You!",
                    text: "Your product add to cart!",
                    icon: "success"
                });
                refetch()
            }
        }
        else {
            const pervPr = findM.productPrice
            const pr = productPrice
            const totalPr = parseFloat(pervPr + pr)

            const pervQty = findM.productQuantity
            const qty = 1
            const totalQty = parseInt(pervQty + qty)

            const re = await axiosPublic.patch(`/add-to-cart/${findM._id}?price=${totalPr}&&qty=${totalQty}`)
            console.log(re.data);
            if (re.data.modifiedCount) {
                Swal.fire({
                    title: "Thank You!",
                    text: "Your product add to cart!",
                    icon: "success"
                });
            }
            refetch()
        }
        // console.log(findMyItem);


        // console.log(addCart);
    }
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className='relative'>
                <img className='w-full h-72'
                    src={productImg}
                    alt="Shoes" />
                <p className='bg-gray-800 absolute text-white px-2 py-1 rounded-sm left-0 top-0'>{productAddingTime}</p>
                <p className='bg-gray-800 absolute text-white px-2 py-1 rounded-sm right-0 top-0'>{brandName}</p>
            </figure>
            <div className="card-body">
                <h2 className="text-2xl font-semibold">{productName}</h2>
                <p>{productDescription.slice(0, 75)}...</p>
                <div className="card-actions justify-between items-center">
                    <ReactStars
                        value={productRating}
                        edit={false}
                        size={24}
                    >
                    </ReactStars>
                    <div className="badge badge-outline">{productCategory}</div>
                </div>

                <div className="card-actions justify-between items-center">
                    <h3 className='text-2xl font-semibold'>
                        ${productPrice}
                    </h3>
                    <button onClick={() => handelAddToCartBtn(_id)} className='btn btn-accent'>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductsCard;