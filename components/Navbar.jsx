"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("adminToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleCreateProductClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      router.push("/login");
    }
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-lg">
      <div className="text-xl font-bold">
        <Link href="/">Athlo</Link>
      </div>

      <div className="text-lg">
        <Link
          href="/createproduct"
          onClick={handleCreateProductClick}
          className="hover:text-zinc-400"
        >
          Create Product
        </Link>
      </div>

      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/login"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
