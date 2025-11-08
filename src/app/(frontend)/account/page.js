import React from "react";
import Image from "next/image";


// components
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";

const Account = () => {


    return (
        <div>
            <Header/>
            <Navbar/>
            <div className="relative w-full h-[250px] overflow-hidden flex justify-center">
                <Image src={"/images/shop-bg.jpg"} width={883} height={1600} alt="shop-bg" className="w-full absolute bottom-10  " />
                <div className="z-1 text-center pt-10">
                    <h1 className="text-5xl">Account</h1>
                    <p className="text-lg pt-5">Viewing your account Info!</p>
                </div>
            </div>
        </div>
    )
}

export default Account