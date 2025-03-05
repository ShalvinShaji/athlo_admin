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

  // Close menu when clicking outside
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
    <>
      {/* Fixed Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[2000px] mx-auto">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            {/* Logo */}
            <Link
              href="/"
              className={`text-xl lg:text-2xl font-bold tracking-tighter ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              ATHLO
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {isLoggedIn && (
                <Link
                  href="/createproduct"
                  className={`text-base font-medium hover:opacity-70 transition-opacity ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  Create Product
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  href="/orders"
                  className={`text-base font-medium hover:opacity-70 transition-opacity ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  Orders
                </Link>
              )}
            </div>

            {/* Desktop Right Icons */}
            <div className="hidden lg:flex items-center  relative">
              {/* User Icon */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className={`relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors cursor-pointer ${
                  isScrolled ? "text-black" : "text-white"
                }`}
              >
                <User size={24} />
              </button>

              {/* User Dropdown Menu - Appears Below User Icon */}
              {menuOpen && (
                <div
                  ref={menuRef}
                  className="absolute right-10 top-full mt-2 w-40 bg-white shadow-md rounded-lg border border-gray-200"
                >
                  <ul className="py-2">
                    {isLoggedIn ? (
                      <>
                        <li>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/settings"
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          >
                            Settings
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          href="/login"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-center"
                        >
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden p-2 -mr-2 hover:bg-white/10 rounded-lg transition-colors ${
                isScrolled ? "text-black" : "text-white"
              }`}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden fixed inset-x-0 top-[65px] p-6 bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
              isOpen
                ? "translate-y-0 opacity-100 visible"
                : "-translate-y-full opacity-0 invisible"
            }`}
          >
            <div className="flex flex-col space-y-6">
              {isLoggedIn && (
                <Link
                  href="/createproduct"
                  className={`text-base font-medium hover:opacity-70 transition-opacity ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  Create Product
                </Link>
              )}
              {isLoggedIn && (
                <Link
                  href="/orders"
                  className={`text-base font-medium hover:opacity-70 transition-opacity ${
                    isScrolled ? "text-black" : "text-white"
                  }`}
                >
                  Orders
                </Link>
              )}

              <div className="flex items-center space-x-6 pt-6 border-t border-gray-200">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded text-white"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
