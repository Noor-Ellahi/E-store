"use client"
import { logout } from "@/app/features/auth/authSlice"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import { useSelector , useDispatch } from "react-redux"
import { toast } from "react-toastify"


const Header = () => {

    const dispatch = useDispatch()
    const { user, statusbar } = useSelector((state) => state.auth)
    const router = useRouter()

    const loggingOut= async ()=>{
        const res = await axios.post(
            '/api/auth/logout'
        )
        console.log(res)
        dispatch(logout())
        toast.success(res.data.message)
        router.push('/')
    }

    return (
        <div className="bg-[#303030] h-10 flex  text-sm items-center gap-5 justify-end pr-25 max-xl:px-4  ">
            {!user ?
                (
                    <>
                        <button className="text-[#A8A9AC] transition duration-250 hover:text-[#B32830] uppercase cursor-pointer"><Link href={"/login"}>Login</Link></button>
                        <button className="text-[#A8A9AC] transition duration-250 hover:text-[#B32830] uppercase cursor-pointer"><Link href={"/register"}>Sign-Up</Link></button>
                    </>
                ) :
                (
                    <button className="text-[#A8A9AC] transition duration-250 hover:text-[#B32830] uppercase cursor-pointer" onClick={loggingOut}>LogOut</button>
                )
            }
        </div>
    )
}


export default Header