import React from 'react';
import useUser from '../../hooks/useUser';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

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
        <div className="overflow-x-auto px-5 mt-8">
            <div className='flex justify-around'>
                {/* <h3 className='text-3xl font-semibold'>Total User: {totalItem}</h3>
                <h3 className='text-3xl font-semibold'>Total Price: ${totalPrice.toFixed(2)}</h3>
                <button onClick={handelPayBtn} className='btn btn-accent'>Pay Now</button> */}
            </div>
            <table className="table mt-5">
                {/* head */}
                <thead>
                    <tr>
                        <th>Sl. No.</th>
                        <th>Seller Name</th>
                        <th>Sell Category</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        findSeller.map((slR, idx) => <tr>
                            <th>{idx + 1}</th>
                            <td>
                                <div className='flex items-center gap-2'>
                                    <img className='w-12 h-12 rounded-full' src={slR?.photo} alt="" />
                                    <div>
                                        <span>{slR?.name}</span>
                                        <p>{slR?.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{slR?.businessCategory}</td>
                            <td>
                                {slR?.role && 'Seller'}
                            </td>
                            <td><p className={slR?.status === 'pending' ? 'bg-gray-200 text-gray-600 font-medium px-3 text-center py-1 rounded-full' : 'bg-green-200 text-green-700 font-medium px-3 text-center py-1 rounded-full'}>{slR?.status === 'pending' ? 'Block' : 'Active'}</p></td>
                            <td>
                                {slR?.status === 'pending' ?
                                    <button onClick={() => handelActiveBtn(slR?._id)} className='btn btn-success'>Active</button>
                                    :
                                    <button onClick={() => handelBlockBtn(slR?._id)} className='btn btn-success'>Block</button>
                                }
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ManageUser;