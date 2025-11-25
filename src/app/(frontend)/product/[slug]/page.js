// "use client"
import React from "react";
// , { useEffect, useState } 
// Getting Product Info from Mongodb
import { connectDb } from "@/app/lib/mongodb";
import Product from "@/app/modals/Product";

import Image from "next/image";

// Components
import Navbar from "@/app/components/navbar/navbar";
import Header from "@/app/components/header/header";
import ProductInfo from "@/app/components/productInfo/ProductInfo";
import axios from "axios";
import PageDefiner from "@/app/components/PageDefiner/PageDefiner";







const ProductInfoPage = async ({ params }) => {


    // console.log(params)
    // const [product, setProduct] = useState()
    const { slug } = await params;
    await connectDb();
    const product = await Product.findOne({ slug }).lean();
    

    console.log(product)

    const serializedProducts = {
        ...product,
        _id: product._id.toString(), // convert ObjectId to string
        createdBy: product.createdBy.toString(),
        createdAt: product.createdAt.toISOString(), // convert Dates to strings
        updatedAt: product.updatedAt.toISOString(),
    }







    if (!product) {
        return <h2>Product not found</h2>;
    }



    return (
        <div>
            <Header />
            <Navbar />
            <PageDefiner head={"Shop Single"} para={"Grab yourself the best! on BAZAAR"}/>
            <ProductInfo
                product={serializedProducts}
            />



            {/* <div className="flex justify-center px-20">
                <div className="w-[30%] relative">
                    <ImageModal
                        src={product.images[0]}
                        trigger={
                            <CgArrowsExpandRight className="text-[#777777] absolute right-7.5 top-7.5 transition duration-500 hover:text-[#303030] text-3xl cursor-pointer z-5" />
                        }
                    />
                    <Image
                        src={product.images[0]}
                        height={1600}
                        width={880}
                        alt={product.name}
                        priority={true}
                    />
                </div>
                <div className="ml-10 mt-10">
                    <h1 className="text-3xl font-medium ">{product.name}</h1>
                    <p className="text-2xl  mt-2 text-xl">$ {product.price - 1}.99</p>
                    <div className="flex gap-5 mt-10">
                        <Counter initial={1} />
                        <button className="text-[#BBBCB6] bg-[#000] px-10 py-2.5 transition border cursor-pointer duration-500 hover:bg-[#fff] hover:text-[#000]">ADD TO CART</button>
                        <Tooltip text="Add to Wishlist" position="top">
                            <button className="transition border cursor-pointer duration-500 py-2.5 px-3 text-xl hover:text-[#fff] hover:bg-[#000]"><LuHeart/></button>
                        </Tooltip>
                    </div>
                    <div>
                        <div className="flex gap-15 mt-20">
                            <p className=" text-lg">Category:</p>
                            <p className=" text-[#808080] capitalize">{product.description}</p>
                        </div>
                        <div className="flex gap-15">
                            <p className="mt-3 text-lg">Share:</p>

                            <Tooltip text="Copy URL" position="right">
                                <CopyUrlButton/>
                            </Tooltip>




                        </div>
                    </div>
                </div>

            </div> */}

        </div>
    )
}

export default ProductInfoPage;


