'use client'
import Image from "next/image";

import React, { useEffect} from "react";
import { fetchUserFromCookie } from "@/app/features/auth/authSlice";
import { useDispatch } from "react-redux";

// Components
import WishComponent from "@/app/components/WishComponent/WishComponent";
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";

const WishList = () => {
    const dispatch = useDispatch()

    

    useEffect(() => {
        dispatch(fetchUserFromCookie())
    }, [])
    return (
        <div>
            <Header />
            <Navbar />
            <div className="relative w-full h-[250px] overflow-hidden flex justify-center">
                <Image priority={true}  src={"/images/shop-bg.jpg"} width={883} height={1600} alt="shop-bg" className="w-full absolute bottom-10  " />
                <div className="z-1 text-center pt-10">
                    <h1 className="text-5xl">Wishlist</h1>
                    <p className="text-lg pt-5">CheckOut your wishlist here!</p>
                </div>
            </div>
            <WishComponent/>
        </div>
    )
}


export default WishList