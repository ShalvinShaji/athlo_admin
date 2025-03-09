"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" text-white py-6 z-900 h-[80px] md:h-[100px] lg:h-[150px] flex flex-col justify-center items-center p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center ">
        <div className="text-xl font-bold mt-6">
          <Link href="/">Athlo</Link>
        </div>

        <div className="flex space-x-6 mt-4 md:mt-0 items-center jus">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Jersey
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Contact
          </Link>
          <Link href="/" className="hover:text-gray-400">
            Privacy Policy
          </Link>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            x
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400"
          >
            instagram
          </a>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} Athlo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
