import React from 'react';
import { GiShoppingCart } from 'react-icons/gi';
import { IoExitOutline } from 'react-icons/io5';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaHistory } from 'react-icons/fa';
import { MdDashboard, MdManageAccounts } from 'react-icons/md';
import useUserR from '../../hooks/useUserR';
import useAdmin from '../../hooks/useAdmin';
import useSeller from '../../hooks/useSeller';

const Sidebar = () => {
    const { user } = useAuth()
    console.log(user);
    const [userR] = useUserR()
    const [admin] = useAdmin()
    const [seller] = useSeller()
    return (
        <div className=''>
            <aside className="flex fixed flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <a href="#">
                    <img className="w-24" src="/images.jpg" alt="" />
                </a>

                <div className="relative mt-6">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </span>

                    <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search" />
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <NavLink to='/dashboard/das' className="flex items-center px-4 py-2 mt-5 ss text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-amber-800" href="#">
                            <span className='text-2xl'><MdDashboard></MdDashboard></span>
                            <span className="mx-4 font-medium">Dashboard</span>
                        </NavLink>

                        {seller && <NavLink to='/dashboard/my-products' className="flex items-center px-4 py-2 mt-5 ss text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-amber-800" href="#">
                            <span className='text-2xl'><GiShoppingCart></GiShoppingCart></span>
                            <span className="mx-4 font-medium">My Products</span>
                        </NavLink>}

                        {admin && <NavLink to='/dashboard/manage-all' className="flex items-center px-4 py-2 mt-5 ss text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-amber-800" href="#">
                            <span className='text-2xl'><MdManageAccounts /></span>
                            <span className="mx-4 font-medium">Manage All</span>
                        </NavLink>}

                        {userR && <NavLink to='/dashboard/my-cart' className="flex items-center px-4 py-2 mt-5 ss text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-amber-800" href="#">
                            <span className='text-2xl'><GiShoppingCart></GiShoppingCart></span>
                            <span className="mx-4 font-medium">My Cart</span>
                        </NavLink>}

                        {userR && <NavLink to='/dashboard/history' className="flex items-center px-4 py-2 mt-5 ss text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-amber-800" href="#">
                            <span className='text-2xl'><FaHistory></FaHistory></span>
                            <span className="mx-4 font-medium">History</span>
                        </NavLink>}

                        {/* <NavLink to='' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                            <span className="mx-4 font-medium"></span>
                        </NavLink> */}

                        <hr className="my-6 border-gray-200 dark:border-gray-600" />
                    </nav>
                    <a href="#" className="flex items-center px-4 -mx-2">
                        <img className="object-cover mx-2 rounded-full h-9 w-9" src={user?.photoURL} alt="avatar" />
                        <span className="mx-2 font-medium text-gray-800 dark:text-gray-200">{user?.displayName}</span>
                    </a>

                    <Link to='/' className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                        <span className='text-2xl'><IoExitOutline></IoExitOutline></span>

                        <span className="mx-4 font-medium">Exit</span>
                    </Link>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;