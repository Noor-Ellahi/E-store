import React from "react";
import Image from "next/image";

import Counter from "@/app/components/Counter"
import { CgClose } from "react-icons/cg";

const CartSection = ({ cart }) => {

    console.log(cart)
    return (
        <ul className="w-[100%] flex flex-col items-center justify-center gap-8">
            <li className="flex justify-between text-2xl w-[65%] max-2xl:w-[75%] max-xl:w-[90%]">
                <h1>Product</h1>
                <div className="flex gap-32">
                    <h1>Price</h1>
                    <h1>Product</h1>
                    <h1  className="pr-40">Product</h1>
                </div>
            </li>
            {
                cart.map((item, index) => {
                    console.log()
                    return (
                        <li key={index} className="flex justify-between text-[#828282] w-[65%] max-2xl:w-[75%] max-xl:w-[90%] max-lg:h-20 h-30">
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
                            <div className="flex gap-30  max-xl:gap-25">
                                <div className="flex items-center gap-25 max-xl:gap-15 ">
                                    <h3>${item.productId.price - 1}.99</h3>
                                    <Counter carty />
                                </div>
                                <div className="flex items-center gap-35 max-xl:gap-25 ">
                                    <h3>${item.productId.price - 1}.99</h3>
                                    <CgClose className="text-2xl" />
                                </div>
                            </div>
                        </li>
                    )

                })
            }
        </ul>
    )
}

export default CartSection