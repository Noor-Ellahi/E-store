"use client"
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import ProductSection from "@/app/components/productSection/productSection";
import Image from "next/image";
import React, { use } from "react";
import FollowSection from "@/app/components/followSection/followSection";
import Footer from "@/app/components/footer/footer";
import PageDefiner from "@/app/components/PageDefiner/PageDefiner";



const ShopPage = () => {



    return (
        <div>
            <Header />
            <Navbar />
            <PageDefiner head={"Shop"} para={"Grab yourself the best! on BAZAAR"}/>
            <ProductSection />
            <FollowSection />
            <Footer />
        </div>
    )
}

export default ShopPage;