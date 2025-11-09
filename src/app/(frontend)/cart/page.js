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



const Cart = () => {

    
    const user = useSelector(state => state.auth.user)

    // console.log(carts)




    // const [userCart , setUserCart] = useState([])


    // const getCartPerUser = async () => {
    //     let apiUrl = "http://localhost:3000/api/cart"
    //     try {
    //         const res = await axios({
    //             url : apiUrl,
    //             method: "GET",
    //             headers : {
    //                 Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTA0ODk3MmQ0ZjZhMjE0MzI5MTFiNiIsImVtYWlsIjoiZmFyb29xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MjI2NjYxMSwiZXhwIjoxNzYyMjcwMjExfQ.BfmBE48Nhd5IdNXAVRALtRQ2HMabZ719MX3lHhlSH_4"
    //             }
    //         })
    //         console.log(res)
    //         const items = res.data?.cart?.items || [];
    //         setUserCart(items)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(()=>{
    //     getCartPerUser()
    // },[])

    
    return (
        <div className="bg-[#ffffff]">
            <Header />
            <Navbar />
            <div className="relative w-full h-[250px] overflow-hidden flex justify-center">
                <Image src={"/images/shop-bg.jpg"} width={883} height={1600} alt="shop-bg" className="w-full absolute bottom-10  " />
                <div className="z-1 text-center pt-10">
                    <h1 className="text-5xl">Cart</h1>
                    <p className="text-lg pt-5">Quickly Pack your items!</p>
                </div>
            </div>
            {user ? (
                // <CartSection cart={carts} />
                <CartSection />
            ) : (
                <div className="w-full h-50 flex justify-center">
                    <h1 className="text-[#808080]">
                        No Cart found!
                    </h1>
                </div>
            )}

            {/* <FollowSection /> */}
            <Footer />
        </div>

    )
}


export default Cart