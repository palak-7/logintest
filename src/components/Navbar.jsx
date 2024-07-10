"use client";
import React, { useState } from "react";
import { useContext } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import { RiLoginBoxLine } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import UserContext from "../context/UserContext";
import CartContext from "../context/CartContext";
import { Badge } from "antd";
import { logout } from "../services/user";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(UserContext);
  const addToCart = useContext(CartContext);

  // const doLogout = async () => {
  //   try {
  //     ("use server");
  //     localStorage.removeItem("authToken");
  //     // await logout();
  //     context.setUser(undefined);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Logout error");
  //   }
  // };
  //logout
  const doLogout = async () => {
    try {
      await logout();
      context.setUser(undefined);
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout error");
    }
  };
  return (
    <div
      className={`bg-purple w-full h-20 lg:h-28 border-b-[1px] border-white text-white lg:flex lg:justify-between lg:mx-auto px-4 fixed z-50`}
    >
      <div className="max-w-screen-2xl h-full mx-auto flex px-4 items-center justify-between lg:mx-0">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            priority
            className="lg:w-[210px] lg:h-[100px] w-[130px] h-[70px] items-center"
            alt="Utsao Logo"
            width={200}
            height={200}
          />
        </Link>
        <div
          className="inline-flex lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FiMenu className="text-3xl" />
        </div>
      </div>
      <ul
        className={`bg-white font-pacifico bg-opacity-100 mt-1 rounded-lg lg:bg-transparent items-center gap-10 uppercase text-sm w-full lg:flex lg:items-center lg:w-auto p-3 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <Link href="/">
          <li className="nav-item pb-1 text-black lg:text-white">Home</li>
        </Link>
        <Link href="/about">
          <li className="nav-item pb-1 text-black lg:text-white">About Us</li>
        </Link>
        <Link href="/products">
          <li className="nav-item pb-1 text-black lg:text-white">Products</li>
        </Link>
        <Link href="/blogs">
          <li className="nav-item pb-1 text-black lg:text-white">Blog</li>
        </Link>
        <Link href="/contact">
          <li className="nav-item pb-1 text-black lg:text-white">Contact Us</li>
        </Link>
        {!context.user ? (
          <>
            <Link className="lg:hidden" href="/login">
              <li className="pb-1 text-black">Login</li>
            </Link>
            <Link className="lg:hidden" href="/signup">
              <li className="pb-1 text-black">SignUp</li>
            </Link>
          </>
        ) : (
          <>
            <Link className="lg:hidden" onClick={doLogout} href="/login">
              <li className="pb-1 text-black">Log Out</li>
            </Link>
          </>
        )}
      </ul>
      <div className="hidden lg:inline-flex gap-8 items-center">
        {!context.user ? (
          <>
            <button className="w-[150px] h-14 bg-white flex items-center justify-center text-black uppercase text-sm font-semibold rounded-md hover:bg-darkRed duration-300">
              <Link href="/login">
                <div className="flex">
                  <RiLoginBoxLine className="mr-2 mt-1" />
                  Login/Register
                </div>
              </Link>
            </button>
          </>
        ) : (
          <>
            <Link href="/my-orders" className="hover:scale-110">
              <p className="text-white">My Orders</p>
            </Link>
            {context?.user?.id == "52a2e697-1cd4-43a0-bb85-8598e3cc2705" && (
              <button className="w-[100px] h-14 bg-white flex items-center justify-center text-black uppercase text-sm font-semibold rounded-md hover:bg-darkRed duration-300">
                <Link href={`/admin/${context?.user?.id}`}>
                  <div className="flex">Panel</div>
                </Link>
              </button>
            )}
            <Link href={`/show-cart/${context?.user?.id}`}>
              <Badge count={addToCart.cart}>
                <FaShoppingCart className="text-white text-3xl" />
              </Badge>
            </Link>
            <button className="w-[100px] h-14 bg-white flex items-center justify-center text-black uppercase text-sm font-semibold rounded-md hover:bg-darkRed duration-300">
              <Link onClick={doLogout} href="/login">
                <div className="flex">
                  <SiGnuprivacyguard className="mr-2 mt-1" />
                  Log Out
                </div>
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
