import React from 'react';
import useMyCarts from '../../hooks/useMyCarts';
import { MdDelete } from 'react-icons/md';
import useProducts from '../../hooks/useProducts';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
    const [myCarts, refetch] = useMyCarts()
    const [products] = useProducts()
    const totalItem = myCarts.reduce((p, q) => p + q.productQuantity, 0)
    const totalPrice = myCarts.reduce((p, q) => p + q.productPrice, 0)
    const navigate = useNavigate()

    const handelDeleteBtn = async (id, productId) => {
        // console.log(id, productId);
        const axiosPublic = useAxiosPublic()
        const findDeleteItm = myCarts.find(d => d._id === id)
        const findpro = products.find(d => d._id === productId)
        const tP = findDeleteItm.productPrice
        const pP = findpro.productPrice
        const pQ = findDeleteItm.productQuantity
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be delete this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (pQ > 1) {
                    const totalSa = parseFloat(tP - pP)
                    const qty = parseInt(pQ - 1)
                    console.log(qty);
                    console.log(totalSa);
                    const res = await axiosPublic.patch(`/deletPro/${id}?price=${totalSa}&&qty=${qty}`)
                    if (res.data) {
                        refetch()
                    }
                }
                else {
                    console.log('kkdjvdfkvvfd');
                    const re = await axiosPublic.delete(`/deletePro/${id}`)
                    refetch()
                }

                Swal.fire({
                    title: "Deleted!",
                    text: "Your product has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const handelPayBtn = () => {
        if (totalPrice > 0) {
            navigate('/payment/shopping')
        }
        else{
            console.log('object');
        }
    }
    return (
        <div className="overflow-x-auto px-5 mt-8">
            <div className='flex justify-around'>
                <h3 className='text-3xl font-semibold'>Total Item: {totalItem}</h3>
                <h3 className='text-3xl font-semibold'>Total Price: ${totalPrice.toFixed(2)}</h3>
                <button onClick={handelPayBtn} className='btn btn-accent'>Pay Now</button>
            </div>
            <table className="table mt-5">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Products Name</th>
                        <th>Products Iage</th>
                        <th>Products Price</th>
                        <th>Products Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        myCarts.map((myCart, idx) => <tr>
                            <th>{idx + 1}</th>
                            <td>{myCart?.productName}</td>
                            <td>
                                <img src={myCart?.productImg} className='w-24 h-20 rounded-lg' alt="" />
                            </td>
                            <td>${myCart?.productPrice.toFixed(2)}</td>
                            <td>Qty: 0{myCart?.productQuantity}</td>
                            <td>
                                <button onClick={() => handelDeleteBtn(myCart?._id, myCart?.productId)} className='text-2xl'><MdDelete></MdDelete></button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyCart;