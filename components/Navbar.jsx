"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const checkLoginStatus = () => {
      const token = Cookies.get("adminToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("adminToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header
      className={`${
        isScrolled ? "fixed top-0 left-0 w-full z-600" : "relative"
      } transition-all duration-300 h-[70px] bg-[#111] shadow-lg`}
    >
      <nav className="max-w-[2000px] mx-auto">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl lg:text-2xl font-bold tracking-tighter text-white"
          >
            ATHLO
          </Link>

          {/* Show navigation links and user menu only if logged in */}
          {isLoggedIn && (
            <>
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                <Link
                  href="/createproduct"
                  className="text-base font-medium hover:opacity-70 transition-opacity text-white"
                >
                  Create Product
                </Link>
                <Link
                  href="/orders"
                  className="text-base font-medium hover:opacity-70 transition-opacity text-white"
                >
                  Orders
                </Link>
              </div>

              {/* Desktop Right Icons */}
              <div className="hidden lg:flex items-center relative">
                {/* User Icon */}
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-700 transition-colors cursor-pointer text-white"
                >
                  <User size={24} />
                </button>

                {/* User Dropdown Menu */}
                {menuOpen && (
                  <div
                    ref={menuRef}
                    className="absolute right-10 top-full mt-2 w-40 bg-[#111] shadow-md rounded-lg border border-zinc-700 p-2"
                  >
                    <ul className="py-2">
                      <li>
                        <Link
                          href="/profile"
                          className="block text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/settings"
                          className="block text-gray-300 hover:text-white hover:bg-gray-800 p-2 rounded-lg transition-colors"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-start text-gray-200 bg-red-500 hover:text-white hover:bg-red-400 p-2 rounded-lg transition-colors cursor-pointer mt-2"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Mobile Menu Button (Always Visible) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu (Only Shows If Logged In) */}
        {isLoggedIn && (
          <div
            className={`lg:hidden fixed inset-x-0 top-[65px] p-6 bg-[#111] backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
              isOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-full opacity-0 invisible"
            }`}
          >
            <div className="flex flex-col space-y-6">
              <Link
                href="/createproduct"
                className="text-base font-medium hover:opacity-70 transition-opacity text-white"
              >
                Create Product
              </Link>
              <Link
                href="/orders"
                className="text-base font-medium hover:opacity-70 transition-opacity text-white"
              >
                Orders
              </Link>

              <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
