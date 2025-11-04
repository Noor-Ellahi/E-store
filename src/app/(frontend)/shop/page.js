import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import ProductSection from "@/app/components/productSection/productSection";
import Image from "next/image";
import React, { use } from "react";
import FollowSection from "@/app/components/followSection/followSection";
import Footer from "@/app/components/footer/footer";



const ShopPage = () => {



    return (
        <div>
            <Header />
            <Navbar />
            <div className="relative w-full h-[250px] overflow-hidden flex justify-center">
                <Image src={"/images/shop-bg.jpg"} width={883} height={1600} alt="shop-bg" className="w-full absolute bottom-10  " />
                <div className="z-1 text-center pt-10">
                    <h1 className="text-5xl">Shop</h1>
                    <p className="text-lg pt-5">Grab yourself the best! on BAZAAR </p>
                </div>
            </div>
            <ProductSection />
            <FollowSection />
            <Footer />
        </div>
    )
}

export default ShopPage;