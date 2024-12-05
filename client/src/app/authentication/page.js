"use client"

import Link from "next/link"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="w-full max-w-[600px] p-4 mx-auto min-h-[100vh] flex items-center">
      <div className="relative">
        <div className="mb-6 flex gap-8 text-xl justify-center items-center">
          <button
            onClick={() => setIsLogin(true)}
            className={`transition-colors text-2xl ${
              isLogin ? " underline" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`transition-colors  text-2xl ${
              !isLogin ? " underline" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(${isLogin ? "-50%" : "0"})`,
              width: "200%",
            }}
          >
            {/* Register Form */}
            <div className="w-[50%] flex-shrink-0">
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-[13px] text-gray-400 text-center">
                    There are many advantages to creating an account: the payment process is faster, shipment tracking is
                    possible and much more.
                  </p>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="username" className="block text-[13px] text-gray-500">
                      Username *
                    </label>
                    <input
                      id="username"
                      className="w-full rounded-md border bg-[#ffffff12]  px-3 py-2 focus:border-[#004798] focus:outline-none focus:ring-1 focus:ring-[#004798]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-[13px] text-gray-500">
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-md border bg-[#ffffff12]  px-3 py-2 focus:border-[#004798] focus:outline-none focus:ring-1 focus:ring-[#004798]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-[13px] text-gray-500">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-md border bg-[#ffffff12]  px-3 py-2 focus:border-[#004798] focus:outline-none focus:ring-1 focus:ring-[#004798]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                        <span className="sr-only">Toggle password visibility</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="customer"
                        name="userType"
                        value="customer"
                        defaultChecked
                        className="h-4 w-4 border-gray-300 text-[#004798] focus:ring-[#004798]"
                      />
                      <label htmlFor="customer" className="text-sm">
                        I am a customer
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="vendor"
                        name="userType"
                        value="vendor"
                        className="h-4 w-4 border-gray-300 text-[#004798] focus:ring-[#004798]"
                      />
                      <label htmlFor="vendor" className="text-sm">
                        I am a vendor
                      </label>
                    </div>
                  </div>
                  <div className="text-[13px] text-gray-400">
                    Your personal data will be used to support your experience throughout this website, to manage access to
                    your account, and for other purposes described in our{" "}
                    <a href="#" className="text-[#004798] hover:underline">
                      privacy policy
                    </a>
                    .
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#004798] px-4 py-2 text-white hover:bg-[#004798]/90 focus:outline-none focus:ring-2 focus:ring-[#004798] focus:ring-offset-2"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>

            {/* Login Form */}
            <div className="w-[50%] flex-shrink-0">
              <div className=" p-6">
                <div className="mb-6">
                  <p className="text-[13px] text-gray-400 text-center">If you have an account, sign in with your username or email address.</p>
                </div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="block text-[13px] text-gray-400">
                    Username or email address *
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      className="w-full rounded-md bg-[#ffffff12] border border-gray-300 px-3 py-2 focus:border-[#004798] focus:outline-none focus:ring-1 focus:ring-[#004798]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="login-password" className="block text-[13px] text-gray-400">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-md bg-[#ffffff12] border border-gray-300 px-3 py-2 focus:border-[#004798] focus:outline-none focus:ring-1 focus:ring-[#004798]"
                        required
                      />
                      
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                        <span className="sr-only">Toggle password visibility</span>
                      </button>
                    </div>
                  </div>
                  
                  <Link href="/authentication/forgetPassword" className="text-sm flex justify-end text-[#004798] hover:underline text-right w-full py-1 ">
                        Forgot password?
                      </Link>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-[#004798] px-4 py-2 text-white hover:bg-[#004798]/90 focus:outline-none focus:ring-2 focus:ring-[#004798] focus:ring-offset-2"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

