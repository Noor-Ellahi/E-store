"use client"
import React, { useEffect } from "react";
import Image from "next/image";


// components
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserFromCookie } from "@/app/features/auth/authSlice";
import Footer from "@/app/components/footer/footer";

const Account = () => {

    const user = useSelector(state => state.auth.user)
    console.log(user)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserFromCookie())
    }, [dispatch])
    return (
        <div>
            <Header />
            <Navbar />
            <div className="relative w-full h-[250px] overflow-hidden flex justify-center">
                <Image src={"/images/shop-bg.jpg"} width={883} height={1600} alt="shop-bg" className="w-full absolute bottom-10  " />
                <div className="z-1 text-center pt-10">
                    <h1 className="text-5xl">Account</h1>
                    <p className="text-lg pt-5">Viewing your account Info!</p>
                </div>
            </div>

            {
                user ?
                    (
                        <>
                            <div className="flex justify-center pb-10">
                                <div className="w-[65%] max-sm:w-[90%] max-lg:w-[80%]">
                                    <h1 className="text-2xl pb-3">
                                        ORDER HISTORY
                                    </h1>
                                    <p className="text-[#7B7B77]">You haven't placed any orders yet.</p>
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="w-[65%] max-sm:w-[90%] max-lg:w-[80%]">
                                    <h1 className="text-2xl pb-7.5">
                                        ACCOUNT DETAILS
                                    </h1>
                                    <ul className="flex flex-col gap-5">
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">NAME:</h2>
                                            <p className="text-[#7B7B77] font-semibold">{user.name}</p>
                                        </li>
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">E-MAIL:</h2>
                                            <p className="text-[#7B7B77] font-semibold">{user.email}</p>
                                        </li>
                                        <li>
                                            <h2 className="font-bold">ADDRESS:</h2>
                                        </li>
                                        <li>
                                            <h2 className="font-bold">ADDRESS 2:</h2>
                                        </li>
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">COUNTRY:</h2>
                                            <p className="text-[#7B7B77] font-semibold">Pakistan</p>
                                        </li>
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">Created On:</h2>
                                            <p className="text-[#7B7B77] font-semibold">{user.createdAt}</p>
                                        </li>
                                        <li>
                                            <h2 className="font-bold">PHONE:</h2>
                                        </li>
                                        <li className="pt-5 flex gap-5">
                                            <button className=" transtion duration-300 hover:bg-[#000] bg-[#fff] text-[#000] hover:text-[#fff] px-5 py-2.5 text-[14px] font-semibold font-sans border-2">RETURN TO SHOP</button>
                                            <button className="transtion duration-300 hover:bg-[#fff] bg-[#000] text-[#fff] hover:text-[#000] px-7.5 py-2.5 border-[black] text-[14px] font-semibold font-sans border-2">LOGOUT</button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </>
                    ) : (<h1>NO user Found</h1>)
            }

            <Footer />
        </div>
    )
}

export default Account