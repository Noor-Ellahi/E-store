'use client'
import Image from "next/image";

import React, { useEffect } from "react";
import { fetchUserFromCookie } from "@/app/features/auth/authSlice";
import { useDispatch } from "react-redux";

// Components
import WishComponent from "@/app/components/WishComponent/WishComponent";
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import PageDefiner from "@/app/components/PageDefiner/PageDefiner";

const WishList = () => {
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(fetchUserFromCookie())
    }, [])
    return (
        <div>
            <Header />
            <Navbar />
            <PageDefiner head={"Wishlist"} para={"CheckOut your wishlist here!"} />
            <WishComponent />
        </div>
    )
}


export default WishList