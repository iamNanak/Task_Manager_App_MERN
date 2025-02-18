import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white py-8 mt-3">
      <div className="container mx-auto text-center">
        <h3 className="text-xl font-semibold">Connect with Us</h3>
        <div className="flex justify-center space-x-6 mt-4">
          <Link
            to="https://facebook.com"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            to="https://twitter.com"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <FaTwitter size={24} />
          </Link>
          <Link
            to="https://linkedin.com"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            to="https://github.com"
            target="_blank"
            className="text-gray-400 hover:text-white"
          >
            <FaGithub size={24} />
          </Link>
        </div>
        <p className="mt-4 text-gray-400">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
