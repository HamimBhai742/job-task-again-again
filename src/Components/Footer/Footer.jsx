import React from 'react';
import img from '/images-removebg-preview.png'
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
const Footer = () => {
    return (
        <section>
            <footer className="footer bg-gray-800 text-neutral-content p-5">
                <aside>
                    <img className='w-36' src={img} alt="" />
                    <p className='max-w-[760px]'>
                        Crazy Shop is your one-stop destination for a wide variety of unique and exciting products. From the latest gadgets to trendy fashion accessories, Crazy Shop offers an eclectic mix of items that cater to every taste and need. Whether you're looking for the hottest tech, stylish apparel, or quirky home décor, Crazy Shop has it all at unbeatable prices. Discover the thrill of shopping where every find is a surprise, and every purchase is a steal!
                    </p>
                </aside>
                <nav>
                    <h6 className="text-2xl ">Social</h6>
                    <div className="grid grid-flow-col gap-4 text-4xl">
                        <a href='https://web.facebook.com/mdhamim42' target='_blank' className='hover:cursor-pointer hover:text-blue-600 '><FaFacebook></FaFacebook></a>
                        <a href='https://www.linkedin.com/in/md-hamim42' target='_blank' className='hover:cursor-pointer hover:text-blue-600 '><FaLinkedin></FaLinkedin></a>
                        <a href='https://github.com/HamimBhai742' target='_blank' className='hover:cursor-pointer hover:text-blue-600 '><FaGithub></FaGithub></a>
                        <a href='https://www.instagram.com/hamim658742/?hl=bn' target='_blank' className='hover:cursor-pointer hover:text-blue-600 '><FaInstagram></FaInstagram></a>
                    </div>
                </nav>
            </footer>
            <aside className='flex justify-center text-center bg-gray-400'>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </aside>
        </section>
    );
};

export default Footer;