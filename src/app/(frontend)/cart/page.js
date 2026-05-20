"use client"
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import CartSection from "@/app/components/CartSection/CartSection";
import FollowSection from "@/app/components/followSection/followSection";
import Footer from "@/app/components/footer/footer";


import React, { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/app/features/carts/cartSlice";
import { fetchUserFromCookie } from "@/app/features/auth/authSlice";
import PageDefiner from "@/app/components/PageDefiner/PageDefiner";



const Cart = () => {


    const user = useSelector(state => state.auth.user)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserFromCookie())
    }, [dispatch])







    return (
        <div className="bg-[#ffffff]">
            <Header />
            <Navbar />
            
            <PageDefiner head={"Cart"} para={"Quickly Pack your items!"}/>
            {user ? (
                <CartSection />
            ) : (
                <div className="w-full h-50 flex justify-center">
                    <h1 className="text-[#808080]">
                        No Cart found!
                    </h1>
                </div>
            )}

            <Footer />
        </div>

    )
}


export default Cart