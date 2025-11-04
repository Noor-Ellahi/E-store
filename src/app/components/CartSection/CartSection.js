import React from "react";
import Image from "next/image";

import Counter from "@/app/components/Counter"
import { CgClose } from "react-icons/cg";

const CartSection = ({ cart }) => {

    console.log(cart)
    return (
        <ul className="w-[100%] flex flex-col items-center justify-center gap-8">
            <li className="flex justify-between text-2xl w-[65%] max-2xl:w-[75%] max-xl:w-[90%] max-xl:text-xl [@media(max-width:575px)]:hidden">
                <h1 className="pl-2">Product</h1>
                <div className="flex gap-32 max-xl:gap-25 max-lg:gap-20 max-md:gap-10">
                    <h1>Price</h1>
                    <h1>Product</h1>
                    <h1 className="pr-40 max-xl:pr-30 max-lg:pr-15 max-md:pr-11">Product</h1>
                </div>
            </li>
            {
                cart.map((item, index) => {
                    console.log()
                    return (
                        <>
                            <li key={index} className="flex justify-between text-[#828282] my-5 w-[65%] max-2xl:w-[75%] max-xl:w-[90%] max-lg:h-20 h-30 [@media(max-width:575px)]:hidden">
                                <div className="flex items-center gap-7.5 ">
                                    <Image
                                        className="h-full w-30 max-lg:w-20"
                                        src={item.productId.images[0]}
                                        width={1080}
                                        height={1920}
                                        alt="productImg"
                                        priority={true}
                                    />
                                    <h3 className="">{item.productId.name}</h3>
                                </div>
                                <div className="flex gap-30  max-xl:gap-25 max-lg:gap-15 max-md:gap-7.5">
                                    <div className="flex items-center gap-25 max-xl:gap-15 max-lg:gap-7.5 max-md:gap-5 ">
                                        <h3>${item.productId.price - 1}.99</h3>
                                        <Counter carty />
                                    </div>
                                    <div className="flex items-center gap-35 max-xl:gap-25 max-lg:gap-10 max-md:gap-7.5">
                                        <h3>${item.productId.price - 1}.99</h3>
                                        <CgClose className="text-2xl" />
                                    </div>
                                </div>
                            </li>
                        </>
                    )
                })
            }
            {
                cart.map((item, index) => {
                    return (

                        <li key={index} className="h-100 w-full px-5 [@media(min-width:575px)]:hidden">
                            <div className="flex w-full items-start">
                                <Image
                                    className="h-full w-20"
                                    src={item.productId.images[0]}
                                    width={1080}
                                    height={1920}
                                    alt="productImg"
                                    priority={true}
                                />
                            </div>
                            <div className="flex justify-between items-center py-3 border-b-1 border-gray-200">
                                <h1 className="font-medium text-[#000000]">Product:</h1>
                                <h1 className="text-[#828282] font-semibold">{item.productId.name}</h1>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b-1 border-gray-200">
                                <h1 className="font-medium  text-[#000000]">Price:</h1>
                                <h1 className="text-[#828282]">${item.productId.price-1}.99</h1>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b-1 border-gray-200">
                                <h1 className="font-medium  text-[#000000]">Quantity:</h1>
                                <Counter cart/>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b-1 border-gray-200">
                                <h1 className="font-medium text-[#000000]">SubTotal:</h1>
                                <h1 className="text-[#828282]">${item.productId.price-1}.99</h1>
                            </div>
                            <div className="flex justify-end items-center py-3 border-b-1 border-gray-200">
                                <CgClose/>
                            </div>
                        </li>

                    )
                })
            }
        </ul>
    )
}

export default CartSection