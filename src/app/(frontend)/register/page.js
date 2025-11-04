"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
// import { FaFacebook, FaGoogle } from "react-icons/fa";



const Register = () => {
    // const router = useRouter()


    return (
        <div className="flex relative  justify-center items-center h-screen bg-[#FAFAFA]">
            <Link href={"/"} className="absolute top-5 left-5 flex items-center gap-2 transition duration-500 hover:text-[#2240f5]"><FaArrowLeft className="text-sm"/>HOME</Link>
            <div className="flex flex-col gap-5 pt-10 pb-15 px-5 rounded-xl items-start w-100 mx-10">
                <div className="flex flex-col justify-start items-center w-[100%] pb-2  font-medium">
                    <h2 className="text-4xl font-serif pb-5 scale-y-150"> BAZAAR</h2>
                    <h1 className="text-xl pt-1 opacity-50 scale-y-120">Register</h1>
                </div>
                <div className="w-full relative">
                    <input type="text" placeholder="Username" className="peer block bg-white py-2.5 pl-2 rounded-sm focus:border-blue-500 border-1 border-[#DADCE0] border-solid w-[100%] outline-none placeholder-transparent" />
                    <label
                        htmlFor="Name"
                        className="absolute left-3 bottom-full text-gray-500 text-sm transition-all
                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                        peer-focus:top-[0] peer-focus:text-blue-500 peer-focus:text-[10px]"
                    >
                        Username
                    </label>
                </div>
                <div className="w-full relative">
                    <input type="text" placeholder="Email" className="peer block bg-white py-2.5 pl-2 rounded-sm focus:border-blue-500 border-1 border-[#DADCE0] border-solid w-[100%] outline-none placeholder-transparent" />
                    <label
                        htmlFor="email"
                        className="absolute left-3 bottom-full text-gray-500 text-sm transition-all
                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                        peer-focus:top-[0] peer-focus:text-blue-500 peer-focus:text-[10px]"
                    >
                        Email
                    </label>
                </div>
                <div className="w-full relative">
                    <input type="password" placeholder="Password" className="peer block bg-white py-2.5 pl-2 rounded-sm focus:border-blue-500 border-1 border-[#DADCE0] border-solid w-[100%] outline-none placeholder-transparent" />
                    <label
                        htmlFor="email"
                        className="absolute left-3 bottom-full text-gray-500 text-sm transition-all
                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                        peer-focus:top-[0] peer-focus:text-blue-500 peer-focus:text-[10px]"
                    >
                        Password
                    </label>
                </div>
                {/* <h3 className="text-[#2240f5] text-sm cursor-pointer">Forget password?</h3> */}

                <button className="w-full bg-[#2240f5] text-[#fff] py-2 rounded-sm transition hover:shadow-lg cursor-pointer">Register</button>

                <div className="flex justify-end w-[100%] pb-2 text-sm">
                    <p>Already have an account? <span className="font-medium text-[#2240f5] cursor-pointer"><Link href={"/login"}>Sign In</Link></span></p>
                </div>

                {/* <button className="w-full bg-[#FAFAFA] py-2 px-3 rounded-sm text-sm flex items-center shadow-md transition hover:shadow-lg cursor-pointer"> <FaFacebook className="text-2xl text-blue-500" /><span className="px-20">Sign in with Facebook</span></button>
                <button className="w-full bg-[#FAFAFA] py-2 px-3 rounded-sm text-sm flex items-center shadow-md transition hover:shadow-lg cursor-pointer"> <FaGoogle className="text-2xl" /><span className="px-20">Sign in with Google</span></button> */}
            </div>
        </div>
    )
}


export default Register