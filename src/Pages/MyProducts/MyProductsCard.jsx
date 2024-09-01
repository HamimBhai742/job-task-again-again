import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MyProductsCard = ({ my, refetch }) => {
  const { user } = useAuth();
  const navigate=useNavigate()
  const axiosPublic = useAxiosPublic();
  const handelDeleteBtn = async (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You want to be delete this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
    const resDelete = await axiosPublic.delete(`/my-product/${id}`);
    if (resDelete.data.deletedCount) {
      Swal.fire({
        title: "Deleted!",
        text: "Your product has been deleted.",
        icon: "success",
      });
      refetch();
    }
      }
    });

  };

  const handelUpdateBtn = (id) => {
  navigate(`/dashboard/update-my-product/${id}`);
}
  return (
    <div className="card bg-base-100 w-[450px] shadow-xl">
      <figure>
        <img className="w-full h-72" src={my?.productImg} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{my?.productName}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="flex gap-2 items-center my-3">
          <img className="w-16 h-16 rounded-full" src={user?.photoURL} alt="" />
          <div>
            <h3 className="font-semibold text-lg">{user?.displayName}</h3>
            <h3>{user?.email}</h3>
          </div>
        </div>
        <div className="card-actions justify-between">
          <button
            className="btn btn-accent"
            onClick={() => handelUpdateBtn(my?._id)}
          >
            Update
          </button>
          <button
            className="btn btn-error"
            onClick={() => handelDeleteBtn(my?._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProductsCard;