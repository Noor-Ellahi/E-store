"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"



const Header = () =>{

    const router = useRouter()



    return(
        <div className="bg-[#303030] h-10 flex  text-sm items-center gap-5 justify-end pr-25 max-xl:px-4  ">
            <button className="text-[#A8A9AC] transition duration-250 hover:text-[#B32830] uppercase cursor-pointer"><Link href={"/login"}>Login</Link></button>
            <button className="text-[#A8A9AC] transition duration-250 hover:text-[#B32830] uppercase cursor-pointer"><Link href={"/register"}>Sign-Up</Link></button>
        </div>
    )
}


export default Header