"use client"
import React from "react";
import Image from "next/image";



// Components
import ImageModal from "@/app/components/ImageModal";
import Counter from "@/app/components/Counter";
import CopyUrlButton from "@/app/components/CopyUrlBtn";
import Tooltip from "@/app/components/Tooltip";

// Icons
import { LuHeart } from "react-icons/lu";
import { CgArrowsExpandRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";


// import { usePathname } from "next/navigation";
// className={`${pathName === "/" ? "flex justify-center inset-0 fixed items-center bg-[#808080]" : ""}`}

const ProductInfo = ({ product, show, setShow }) => {

    // const pathName = usePathname()
    console.log(product)

    const updatedProduct = { ...product };

    const desc = updatedProduct.description.split(" ")
    if (desc.includes("men") || desc.includes("Men")) {
        updatedProduct.description = "men"
    }
    else if (desc.includes("women") || desc.includes("Women")) {
        updatedProduct.description = "women"
    }
    else {
        updatedProduct.description = "unisex"
    }

    

    return (
        <div className={`${show ? "flex justify-center inset-0 fixed items-center bg-[#000000]/60 z-15" : "bg-[#ffffff] py-20 max-md:py-10 " }`} onClick={() => setShow(false)}>
            <div className={`${show ? "bg-[#ffffff] px-[0] max-sm:mx-5" : ""} flex justify-center px-20 max-md:px-0 max-lg:flex-col max-lg:items-center  `} onClick={(e) => e.stopPropagation()}>
                <div className={ ` w-100 relative max-lg:w-120 max-sm:w-[75%]`}>
                    {
                        !show && (
                            <ImageModal
                                src={product.images[0]}
                                trigger={
                                    <CgArrowsExpandRight className="text-[#777777] absolute right-7.5 top-7.5 transition duration-500 hover:text-[#303030] text-3xl cursor-pointer z-5" />
                                }
                            />
                        )
                    }
                    <Image
                        className={`${show ? "bg-[#f6f6f6]" : ""}`}
                        src={product.images[0]}
                        height={1600}
                        width={880}
                        alt={product.name}
                        priority={true}
                    />
                </div>
                <div className={`${show ? "bg-[#ffffff] pt-[20] relative pr-20" : ""} pl-10 max-sm:px-4 max-sm pt-10 max-lg:w-full`}>
                    {
                        show ? (
                            <CgClose className="absolute top-5 right-5 cursor-pointer" onClick={() => setShow(false)} />
                        ) : null
                    }

                    <h1 className="text-3xl font-medium ">{product.name}</h1>
                    <p className="text-2xl  mt-2 text-xl">$ {product.price - 1}.99</p>
                    <div className="flex gap-5 max-sm:gap-2 mt-10">
                        <Counter initial={1} />
                        {/* <div className="border flex items-center">
                                    <button className="px-5 "><LuMinus /></button>
                                    <span className="mx-2"></span>
                                    <button className="px-5" ><LuPlus /></button>
                                </div> */}
                        <button className="text-[#BBBCB6] bg-[#000] px-10 max-sm:px-5 py-2.5 transition border cursor-pointer duration-500 hover:bg-[#fff] hover:text-[#000]">ADD TO CART</button>
                        <Tooltip text="Add to Wishlist" position="top">
                            <button className="transition border cursor-pointer duration-500 py-2.5 px-3 text-xl hover:text-[#fff] hover:bg-[#000]"><LuHeart /></button>
                        </Tooltip>
                    </div>
                    <div>
                        <div className="flex gap-15 mt-20 max-md:mt-10 items-center">
                            <p className=" text-lg">Category:</p>
                            <p className=" text-[#808080] capitalize">{updatedProduct.description}</p>
                        </div>
                        {
                            !show && (
                                <div className="flex gap-15">
                                    <p className="mt-3 text-lg">Share:</p>
                                    <Tooltip text="Copy URL" position="right">
                                        <CopyUrlButton />
                                    </Tooltip>
                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}


export default ProductInfo