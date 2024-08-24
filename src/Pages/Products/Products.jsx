import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import ProductsCard from './ProductsCard';
import useProductCount from '../../hooks/useProductCount';
import { MdOutlineMenuOpen } from 'react-icons/md';

const Products = () => {
    const hh=new Date()
    console.log(hh);
    const axiosPublic = useAxiosPublic()
    const productsCount = useProductCount()
    const [counts, setCounts] = useState(productsCount)
    const [products, setProducts] = useState([])
    const [selectedValue, setSelected] = useState(null)
    const [open, setOpen] = useState(false)
    const [itemPerPage, setItemPerPage] = useState(12)
    const [currentPage, setCurrentPage] = useState(0)

    const handelOpenBtn = () => {
        setOpen(!open)
    }

    useEffect(() => {
        async function fetchDatas() {
            const cou = await axiosPublic.get('/productsCount')
            console.log(cou.data);
            setCounts(cou.data.count)
        }
        fetchDatas()
    }, [])


    const handelPerPage = (e) => {
        setItemPerPage(e.target.value)
        setCurrentPage(0)
    }

    const handelPreviousBtn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handelNextBtn = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }
    const numberOfPage = Math.ceil(counts / itemPerPage)
    const pages = [...Array(numberOfPage).keys()]
    const handelSort = (e) => {
        setSelected(e.target.value)
    }


    const handelSearchBtn = async (e) => {
        e.preventDefault()
        const searchss = e.target.search.value;
        const se = await axiosPublic.get(`/searchProduct?search=${searchss}`)
        setProducts(se.data);
        setCounts(se.data.length)
    }

    const handelCategorization = async (e) => {
        e.preventDefault()
        const form = e.target
        const brandName = form.brandName.value
        const productCategory = form.productCategory.value
        const minPrice = form.minPrice.value
        const maxPrice = form.maxPrice.value
        const res = await axiosPublic.get(`/productsCategorization?minPrice=${minPrice}&maxPrice=${maxPrice}&brandName=${brandName}&productCategory=${productCategory}`)
        setProducts(res.data);
        setCounts(res.data.length)
        setOpen(false)
    }

    useEffect(() => {
        async function fetchDatas() {
            const ress = await axiosPublic.get(`/productsPage?page=${currentPage}&&size=${itemPerPage}&&sorting=${selectedValue}`)
            setProducts(ress.data)
        }
        fetchDatas()
    }, [currentPage, itemPerPage, selectedValue])

    const brand = ['Breville', 'Ninja Kitchen', 'Vita-Mix Corporation', 'Unilever', 'CeraVe', 'Adidas', 'Nike', 'Sony', 'Apple', 'Samsung','Pilot','Moleskine','La Mer']
    const category = ['Electronics', 'Fashion', 'Home and Kitchen', 'Health and Beauty', 'Books and Stationery']
    return (
        <div className='lg:mx-10 md:mx-5 mx-3'>
            <div className='lg:flex justify-between items-center'>
                <div className='flex gap-3 mb-3'>
                    <form onSubmit={handelSearchBtn} className='flex gap-3'>
                        <input
                            type="text"
                            name='search'
                            placeholder="Type here"
                            className="input input-bordered input-primary w-full max-w-xs" />
                        <input type='submit' className='btn btn-success' value='Search' />
                    </form>
                </div>

                <div className='my-7'>
                    <select  onChange={handelSort} className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Sort By</option>
                        <option value={'desc'}>High to Low</option>
                        <option value={'asc'}>Low to High</option>
                        <option value={'recently'}>Newest first</option>
                    </select>
                </div>

                <div>
                    <button onClick={handelOpenBtn} className='text-5xl'><MdOutlineMenuOpen /></button>
                    <div className={open ? 'mb-3' : 'hidden'}>
                        <form onSubmit={handelCategorization}>
                            <h3 className='text-2xl font-semibold'>Brand Name</h3>
                            <div className='grid grid-cols-2 gap-1'>
                                {
                                    brand.map(b => <>
                                        <div className='flex gap-1'>
                                            <input type="radio" value={b} name='brandName' />
                                            <span>{b}</span>
                                        </div>
                                    </>)
                                }
                                <div className='flex gap-1'>
                                    <input type="radio" value='' name='brandName' />
                                    <span>None</span>
                                </div>
                            </div>
                            <h3 className='text-2xl font-semibold mt-3'>Product Category</h3>
                            {
                                category.map(c => <>
                                    <div className='flex gap-1'>
                                        <input type="radio" name="productCategory" value={c} />
                                        <span>{c}</span>
                                    </div>
                                </>)
                            }
                            <div className='flex gap-1'>
                                <input type="radio" value='' name='productCategory' />
                                <span>None</span>
                            </div>
                            <h3 className='text-2xl font-semibold mt-3'>Price Range</h3>
                            <input placeholder='Min price' className="input input-bordered w-full max-w-28" name='minPrice' type="number" />
                            <input placeholder='Max price' className="input input-bordered w-full max-w-28 ml-3" name='maxPrice' type="number" />
                            <div className='mt-5'>
                                <input className='btn btn-accent' type="submit" value="Categorize " />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {products.length > 0 ?
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5'>
                    {
                        products.map(product => <ProductsCard product={product}></ProductsCard>)
                    }
                </div>
                :
                <>
                    <div>
                        <p className='flex min-h-72 justify-center items-center text-3xl font-bold'>No Data Found</p>
                    </div>
                </>}

            {products.length > 0 ?
                <div className='flex md:gap-5 gap-3 justify-center items-center my-10'>
                    <button onClick={handelPreviousBtn} className='md:btn md:btn-info max-sm:bg-info max-sm:p-2 max-sm:rounded-lg'>Prev</button>
                    <p>{pages.map(p => <button onClick={() => setCurrentPage(p)} className={currentPage === p ? 'md:btn md:btn-secondary md:btn-circle ml-2 max-sm:bg-secondary max-sm:h-7 max-sm:w-7 max-sm:rounded-full' : 'md:btn ml-2 md:btn-circle md:btn-success max-sm:bg-success max-sm:h-7 max-sm:w-7 max-sm:rounded-full'}>{p + 1}</button>)}</p>
                    <button onClick={handelNextBtn} className='md:btn md:btn-accent max-sm:bg-accent max-sm:p-2 max-sm:rounded-lg'>Next</button>
                    <select className='md:border-2 md:border-blue-500 rounded-md px-2' onChange={handelPerPage}>
                        <option value="6">6</option>
                        <option selected value="12">12</option>
                        <option value="24">24</option>
                        <option value="36">36</option>
                        <option value="48">48</option>
                    </select>
                </div>
                :
                <>
                </>}
        </div>
    );
};

export default Products;