// Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">About Us</h2>
          <p>
            Welcome to Crazy Shop! Your go-to destination for quality products
            at the best prices. We aim to deliver exceptional customer service
            and an easy shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/terms" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li>Phone: +880-19263-13093</li>
            <li>Email: mdhamim5088@gmail.com</li>
            <li>Address: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-700 text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Crazy Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
