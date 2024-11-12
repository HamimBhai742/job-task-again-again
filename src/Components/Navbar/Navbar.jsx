import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import img from "/images.jpg";
import { GiShoppingCart } from "react-icons/gi";
import useMyCarts from "../../hooks/useMyCarts";
import useUser from "../../hooks/useUser";
import useAdmin from "../../hooks/useAdmin";
import useSeller from "../../hooks/useSeller";
import useUserR from "../../hooks/useUserR";
const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [myCarts, refetch] = useMyCarts();
  const totalAddItm = myCarts.reduce((p, q) => p + q.productQuantity, 0);
  // refetch()
  console.log(user);
  const [admin] = useAdmin();
  const [seller] = useSeller();
  const [userR] = useUserR();
  console.log(admin);
  const [userDB] = useUser();
  const fiUser = userDB.find((u) => u.email === user?.email);
  const handelLogOutBtn = () => {
    logoutUser();
  };
  return (
    <div className="lg:mx-10 md:mx-5 mx-3">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <NavLink className="text-lg font-medium" to="/">
                Home
              </NavLink>
              <NavLink className="text-lg font-medium" to="/product">
                Product
              </NavLink>
            </ul>
          </div>
          <div className="flex items-center">
            <img
              className="w-16 h-16 rounded-full max-sm:hidden"
              src={img}
              alt=""
            />
            <a className="btn btn-ghost text-2xl">Crazy Shop</a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">
            <NavLink className="text-lg font-medium" to="/">
              Home
            </NavLink>
            <NavLink className="text-lg font-medium" to="/product">
              Product
            </NavLink>
            {userR && (
              <NavLink
                className="text-lg font-medium flex items-center gap-1"
                to="/dashboard/my-cart"
              >
                My Cart
                <p className="text-3xl flex">
                  <GiShoppingCart></GiShoppingCart>
                  <sub className="text-sm">{totalAddItm}</sub>
                </p>
              </NavLink>
            )}
            {/* {user && (
              <NavLink
                className="text-lg font-medium flex items-center gap-1"
                to="/dashboard/das"
              >
                Dashboard
              </NavLink>
            )} */}
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="md:w-14 md:h-14 w-12 h-12 rounded-full"
              >
                <div className="">
                  <img
                    className="md:w-14 md:h-14 w-12 h-12 rounded-full"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-36 p-2 shadow"
              >
                <li>
                  <div className="flex flex-col items-start gap-1">
                    <h3 className="font-semibold">{fiUser?.name}</h3>
                    <p className="bg-green-100 text-green-600 font-medium px-3 rounded-full">
                      {fiUser?.role}
                    </p>
                  </div>
                </li>
                <li>
                  {user && (
                    <NavLink
                      className="text-lg font-medium flex items-center gap-1"
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  )}
                </li>
                <li className="p-2">
                  <button
                    onClick={handelLogOutBtn}
                    className="bg-orange-100 text-orange-600 font-medium p-3 rounded-lg"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/register">
              <button className="border-2 border-green-600 py-2 px-3 rounded-lg">
                Sign Up
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
