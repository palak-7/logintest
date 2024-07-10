"use client";

import Link from "next/link";
import { useState } from "react";
import { login } from "../../services/user";
import UserContext from "../../context/UserContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CartContext from "../../context/CartContext";
const Login = () => {
  const router = useRouter();
  const context = useContext(UserContext);
  const addToCart = useContext(CartContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(formData);
    // localStorage.setItem("authToken", response.data.token);

    if (response.data.success) {
      const userCart = response.data.user.cart;

      // if (userCart) {
      //   let cartArray = JSON.parse(userCart);
      //   console.log(cartArray.length);
      //   addToCart.setCart(cartArray.length);
      // } else {
      //   addToCart.setCart(0);
      // }
      // context.setUser(response.data.user);
      toast.success(response.data.message, {
        position: "bottom-left",
      });
      router.push("/signup");
    } else {
      toast.error(response.data.message, {
        position: "bottom-left",
      });
    }
  };
  return (
    <>
      <section className="bg-skyblue relative z-10 overflow-hidden pb-16 pt-20 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container ">
          <div className="-mx-4 flex flex-wrap ">
            <div className="w-full px-4 lg:flex">
              <div className="bg-mintblue lg:mx-auto max-w-[500px] rounded-lg px-6 py-10 shadow-three m-4">
                <h3 className="mb-3 text-center text-2xl font-bold text-golden sm:text-3xl">
                  Login in to your account
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color text-golden">
                  Login to contact us and continue your journey with Utsao.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark text-golden"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark text-golden"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div>
                      <a
                        href="/forgot-password"
                        className="text-sm font-medium text-indigo-700 hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div> */}
                  <div className="mb-6 bg-purple hover:bg-indigo-500">
                    <button className="flex w-full items-center justify-center rounded-sm bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90">
                      Sign in
                    </button>
                  </div>
                </form>
                <p className="text-center text-base font-medium text-body-color">
                  Dont you have an account?{" "}
                  <Link href="/signup" className="text-purple hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f89b18" />
                <stop offset="1" stopColor="#f89b18" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#f89b18" />
                <stop offset="1" stopColor="#f89b18" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Login;
