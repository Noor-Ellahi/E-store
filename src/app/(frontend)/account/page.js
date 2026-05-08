"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";


// components
import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserFromCookie, logout } from "@/app/features/auth/authSlice";
import Footer from "@/app/components/footer/footer";
import PageDefiner from "@/app/components/PageDefiner/PageDefiner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";



const Account = () => {

    const [order, getOrder] = useState(null)

    const user = useSelector(state => state.auth.user)
    const router = useRouter()
    // console.log(user)


    const dispatch = useDispatch()



    const loggingOut = async () => {
        const res = await axios.post(
            '/api/auth/logout'
        )
        // console.log(res)
        dispatch(logout())
        toast.success(res.data.message)
        router.push('/')
    }

    const getOrders = async () => {
        try {
            const { data } = await axios.get(
                '/api/order',
            )
            console.log(data)
            getOrder(data)
        } catch (error) {
            console.log("Error ouccured", error)
        }

    }

    useEffect(() => {
        dispatch(fetchUserFromCookie())
        getOrders()
    }, [dispatch])

    return (
        <div>
            <Header />
            <Navbar />
            <PageDefiner head={"Account"} para={"Viewing your account Info!"} />

            {
                user ?
                    (
                        <>
                            <div className="flex justify-center pb-10">
                                <div className="w-[65%] max-sm:w-[90%] max-lg:w-[80%]">
                                    <h1 className="text-2xl pb-5">
                                        ORDER HISTORY
                                    </h1>
                                    
                                    {
                                        order ?

                                            <div>
                                                <ul className="flex gap-2 flex-col">
                                                    {
                                                        order[0].products.map((item, index) => {

                                                            return (
                                                                <li key={index} className="relative p-2 border-gray-300 border">
                                                                    <h3 className="absolute bottom-2 right-2.5 font-bold">{item.quantity}x</h3>
                                                                    <h3 className="absolute top-2 right-2.5">{item.productId.price}$</h3>
                                                                    <Image
                                                                        className="h-25 w-25"
                                                                        width={1080}
                                                                        height={1920}
                                                                        priority={true}
                                                                        alt="orderImg"
                                                                        src={item.productId.images[0]}
                                                                    />
                                                                </li>
                                                            )
                                                        })
                                                    }

                                                </ul>
                                                <div className="flex mt-5 justify-between items-center">
                                                    <h3>Status : {order[0].status}</h3>
                                                    <h3 className="font-bold">Total : {order[0].totalPrice}$</h3>
                                                </div>
                                            </div>
                                            :
                                            <p className="text-[#7B7B77]">You haven&apos;t placed any orders yet.</p>

                                    }
                                </div>
                            </div>

                            <div className="flex justify-center mt-5">
                                <div className="w-[65%] max-sm:w-[90%] max-lg:w-[80%]">
                                    <h1 className="text-2xl pb-7.5">
                                        ACCOUNT DETAILS
                                    </h1>
                                    <ul className="flex flex-col gap-5">
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">NAME:</h2>
                                            <p className="text-[#7B7B77] font-semibold">{user.name}</p>
                                        </li>
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">E-MAIL:</h2>
                                            <p className="text-[#7B7B77] font-semibold">{user.email}</p>
                                        </li>
                                        <li>
                                            <h2 className="font-bold">ADDRESS:</h2>
                                        </li>
                                        <li>
                                            <h2 className="font-bold">ADDRESS 2:</h2>
                                        </li>
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">COUNTRY:</h2>
                                            <p className="text-[#7B7B77] font-semibold">Pakistan</p>
                                        </li>
                                        <li className="flex gap-25">
                                            <h2 className="font-bold">Created On:</h2>
                                            <p className="text-[#7B7B77] font-semibold">{new Date(user.createdAt).toLocaleString()}</p>
                                        </li>
                                        <li>
                                            <h2 className="font-bold">PHONE:</h2>
                                        </li>
                                        <li className="pt-5 flex gap-5">
                                            <Link href={'/shop'}><button className=" transtion duration-300 hover:bg-[#000] bg-[#fff] text-[#000] hover:text-[#fff] px-5 py-2.5 text-[14px] font-semibold font-sans border-2">RETURN TO SHOP</button></Link>
                                            <button onClick={loggingOut} className="transtion duration-300 hover:bg-[#fff] bg-[#000] text-[#fff] hover:text-[#000] px-7.5 py-2.5 border-[black] text-[14px] font-semibold font-sans border-2">LOGOUT</button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </>
                    ) : (<div className="flex justify-center">NO user Found</div>)
            }

            <Footer />
        </div>
    )
}

export default Account