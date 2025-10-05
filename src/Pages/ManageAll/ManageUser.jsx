import React from 'react';
import useUser from '../../hooks/useUser';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

const ManageUser = () => {
    const [userDB, refetch] = useUser()
    const findSeller = userDB.filter(s => s.role === 'seller')
    console.log(findSeller, 'lllllllllllll');
    const axiosPublic = useAxiosPublic()
    const handelActiveBtn = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be active this seller!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Active seller!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resA = await axiosPublic.patch(`/seller/active/${id}`)
                if (resA.data.modifiedCount) {
                    Swal.fire({
                        title: "Actived!",
                        text: "This seller is actived",
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }

    const handelBlockBtn = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be block this seller!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Block seller!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const resB = await axiosPublic.patch(`/seller/block/${id}`)
                if (resB.data.modifiedCount) {
                    Swal.fire({
                        title: "Blocked!",
                        text: "This seller is blocked",
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 p-6">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl overflow-hidden"
            >
                <div className="overflow-x-auto px-5 mt-8">
                    <div className='flex justify-around'>
                        {/* <h3 className='text-3xl font-semibold'>Total User: {totalItem}</h3>
                        <h3 className='text-3xl font-semibold'>Total Price: ${totalPrice.toFixed(2)}</h3>
                        <button onClick={handelPayBtn} className='btn btn-accent'>Pay Now</button> */}
                    </div>
                    <table className="table mt-5 w-full">
                        {/* head */}
                        <thead>
                            <tr className="border-b border-white/20">
                                <th className="text-white font-semibold text-left py-4">Sl. No.</th>
                                <th className="text-white font-semibold text-left py-4">Seller Name</th>
                                <th className="text-white font-semibold text-left py-4">Sell Category</th>
                                <th className="text-white font-semibold text-left py-4">Role</th>
                                <th className="text-white font-semibold text-left py-4">Status</th>
                                <th className="text-white font-semibold text-left py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                findSeller.map((slR, idx) => 
                                    <motion.tr 
                                        key={slR._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="border-b border-white/10 hover:bg-white/5 transition-all duration-300"
                                    >
                                        <th className="text-white py-4">{idx + 1}</th>
                                        <td className="py-4">
                                            <div className='flex items-center gap-2'>
                                                <img className='w-12 h-12 rounded-full border-2 border-white/30 object-cover' src={slR?.photo} alt="" />
                                                <div>
                                                    <span className="text-white font-medium">{slR?.name}</span>
                                                    <p className="text-gray-300 text-sm">{slR?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-white py-4">{slR?.businessCategory}</td>
                                        <td className="py-4">
                                            <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                                                {slR?.role && 'Seller'}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <p className={slR?.status === 'pending' ? 
                                                'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 text-orange-300 font-medium px-3 text-center py-1 rounded-full text-sm' : 
                                                'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 font-medium px-3 text-center py-1 rounded-full text-sm'
                                            }>
                                                {slR?.status === 'pending' ? 'Block' : 'Active'}
                                            </p>
                                        </td>
                                        <td className="py-4">
                                            {slR?.status === 'pending' ?
                                                <motion.button 
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handelActiveBtn(slR?._id)} 
                                                    className='bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg'
                                                >
                                                    Active
                                                </motion.button>
                                                :
                                                <motion.button 
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handelBlockBtn(slR?._id)} 
                                                    className='bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg'
                                                >
                                                    Block
                                                </motion.button>
                                            }
                                        </td>
                                    </motion.tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default ManageUser;
