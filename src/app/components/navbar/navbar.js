"use client"
import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart, CiSearch, CiUser } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    // const burgerRef = useRef()
    // const burgerFunc = () => {

    //     if (burgerRef.current.style.height === "0vh") {
    //         burgerRef.current.style.transition = ".5s"
    //         burgerRef.current.style.height = "25vh"
    //         console.log("12")
    //     }
    //     else {
    //         burgerRef.current.style.height = "0vh"
    //         console.log(burgerRef.current.style.height)
    //     }
    // }


    return (
        <div className="relative">
            <div className="flex justify-between px-25 py-10 text-sm max-xl:px-4 bg-[#FAFAFA]">
                <ul className="flex gap-10 font-medium max-xl:hidden">
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830]"><Link href={"/"}>HOME</Link></li>
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830]">PAGE</li>
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830]"><Link href={"/shop"}>SHOP</Link></li>
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830]">CONTACT</li>
                </ul>

                <h1 className="text-4xl pr-50 font-serif scale-y-150 cursor-pointer max-xl:pr-0 [@media(max-width:400px)]:text-3xl">BAZAAR</h1>

                <div className="flex gap-5 text-3xl">
                    <Link href={"/cart"}><CiShoppingCart className="transition cursor-pointer duration-250 hover:text-[#B32830]" /></Link>
                    <CiSearch className="transition cursor-pointer duration-250 hover:text-[#B32830]" />
                    <CiUser className="transition cursor-pointer duration-250 hover:text-[#B32830]" />
                    <HiMenu className="hidden max-xl:block" onClick={() =>setIsOpen(!isOpen) }/>
                </div>
            </div>

            <div className={`absolute z-9 w-[100%] transition-all duration-500 overflow-hidden bg-[#FAFAFA] max-xl:block hidden ${isOpen ? "h-[25vh] [@media(max-width:400px)]:h-[30vh]" : "h-0"}`}>
                <ul className=" text-[grey] px-5 pb-5">
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830] py-2 flex justify-between">Home <span className="text-2xl">+</span></li>
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830] py-2 flex justify-between">Page <span className="text-2xl">+</span></li>
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830] py-2 flex justify-between">Shop <span className="text-2xl">+</span></li>
                    <li className="transition cursor-pointer duration-250 hover:text-[#B32830] py-2 flex justify-between">Contact <span className="text-2xl">+</span></li>
                </ul>
            </div>
        </div>
    )
}


export default Navbar