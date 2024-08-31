import React from 'react';

const MyProductsCard = ({my}) => {
    return (
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure>
          <img className="w-full h-56" src={my?.productImg} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{my?.productName}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-between">
            <button className="btn btn-accent">Update</button>
            <button className="btn btn-error">Delete</button>
          </div>
        </div>
      </div>
    );
};

export default MyProductsCard;