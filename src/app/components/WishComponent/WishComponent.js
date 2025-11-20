
import axios from "axios"
import React, { useEffect, useState } from "react"
import { CgClose } from "react-icons/cg"
import Image from "next/image"
import dayjs from "dayjs"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { addToCartAsync, fetchCart } from "@/app/features/carts/cartSlice"



const WishComponent = () => {
    const [wish, setWish] = useState()
    const dispatch = useDispatch()

    const getWishList = async () => {
        try {
            const res = await axios.get('/api/wishlist')
            console.log(res)
            setWish(res.data)

        } catch (error) {
            console.log("err ouccured", error)
        }
    }
    const delWish = async (id) => {
        try {
            const res = await axios.delete(`/api/wishlist/${id}`)
            console.log(res)
            toast(res.data.message)
            setWish(res.data.findWish.wishItems)
        } catch (error) {
            console.log("Err", error)
        }
    }

    const addToCart = async (item) => {
        try {
            await dispatch(addToCartAsync({ _id: item._id, quantity: 1 }))
            dispatch(fetchCart())
            toast.success("Item added to cart!");
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }
    useEffect(() => {
        getWishList()
        dispatch(fetchCart());
    }, [])
    return (
        <ul className="w-full flex flex-col justify-between items-center">
            {
                wish && wish.length !== 0 ?
                    (wish.cart || wish).map((item, index) => {
                        console.log()
                        return (

                            <li key={index} className=" flex justify-between text-[#828282] my-5 w-[65%] max-2xl:w-[75%] max-xl:w-[90%] max-lg:h-20 h-30 [@media(max-width:575px)]:hidde">
                                <div className="flex items-center gap-7.5 ">
                                    <Image
                                        className="h-full w-30 max-lg:w-20"
                                        src={item.images[0]}
                                        width={1080}
                                        height={1920}
                                        alt="productImg"
                                        priority={true}
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-[#000]">{item.name}</h3>
                                        <h3 className="">$ {item.price - 1}.99 </h3>
                                        <h3 className="">{dayjs(item.createdTime).format("DD MMM YYYY")}</h3>

                                    </div>
                                </div>
                                <div className="flex gap-30  max-xl:gap-25 max-lg:gap-15 max-md:gap-7.5">
                                    <div className="flex items-center gap-25 max-xl:gap-15 max-lg:gap-7.5 max-md:gap-5 ">
                                        <button onClick={() => addToCart(item)} className="text-[#fff] bg-[#000] hover:bg-[#fff] hover:text-[#000] border transition duration-300 py-2.5 px-6">ADD TO CART</button>
                                    </div>
                                    <div className="flex items-center gap-35 max-xl:gap-25 max-lg:gap-10 max-md:gap-7.5">
                                        <CgClose className="text-2xl" onClick={() => delWish(item._id)} />
                                    </div>
                                </div>
                            </li>

                        )
                    }) : (<h1>No WishList available</h1>)


            }
        </ul>
    )
}

export default WishComponent