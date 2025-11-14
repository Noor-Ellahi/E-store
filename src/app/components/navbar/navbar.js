"use client"
import Link from "next/link";
import { useState } from "react";
import { CiShoppingCart, CiSearch, CiUser } from "react-icons/ci";
import { HiMenu } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PopUpCredit from "../PopUpRegister/PopUpRegister";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [pop, setPop] = useState(false)

    const cartCount = useSelector(state => state.cart.items.cart?.length)
    const user = useSelector(state => state.auth.user)
    // console.log(cartCount)
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
                    <div className="relative">
                        <Link href={"/cart"}><CiShoppingCart className="transition cursor-pointer duration-250 hover:text-[#B32830]" /></Link>


                        <span className={`${cartCount <= 0 || cartCount === undefined ? "hidden" : ""} absolute -top-2 -right-2 bg-black text-white text-sm w-5 h-5 flex items-center justify-center rounded-full`}>
                            {cartCount}
                        </span>


                    </div>
                    <CiSearch className="transition cursor-pointer duration-250 hover:text-[#B32830]" />

                    { user ? <Link  href={"/account" }><CiUser className="transition cursor-pointer duration-250 hover:text-[#B32830]" /></Link> :<CiUser onClick={() => setPop(true)} className="transition cursor-pointer duration-250 hover:text-[#B32830]" /> }

                    <HiMenu className="hidden max-xl:block" onClick={() => setIsOpen(!isOpen)} />
                </div>
            </div>

            {
                pop ? 
                (
                    <PopUpCredit setPop={setPop}/>
                ): (null)
            }
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