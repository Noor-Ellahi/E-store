"use client"
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import CartSection from "@/app/components/CartSection/CartSection";


import React, { useEffect, useState } from "react";

import Image from "next/image";
import axios from "axios";


const Cart = () => {

    const [userCart , setUserCart] = useState([])


    const getCartPerUser = async () => {
        let apiUrl = "http://localhost:3000/api/cart"

        try {

            const res = await axios({
                url : apiUrl,
                method: "GET",
                headers : {
                    Authorization : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZTA0ODk3MmQ0ZjZhMjE0MzI5MTFiNiIsImVtYWlsIjoiZmFyb29xQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MjI2NjYxMSwiZXhwIjoxNzYyMjcwMjExfQ.BfmBE48Nhd5IdNXAVRALtRQ2HMabZ719MX3lHhlSH_4"
                }
            })
            console.log(res)
            const items = res.data?.cart?.items || [];
            setUserCart(items)
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(()=>{
        getCartPerUser()
    },[])

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
            {userCart &&(
                <CartSection cart={userCart}/>
            )}
        </div>

    )
}


export default Cart