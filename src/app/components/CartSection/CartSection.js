"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";

import Counter from "@/app/components/Counter"
import { CgClose } from "react-icons/cg";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/app/features/carts/cartSlice";
import Link from "next/link";


const CartSection = () => {



    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart.items.cart)
    const [total , setTotal] = useState(0)

    const delProduct = async (item) => {
        const res = await axios.delete(
            `/api/cart/${item.productId._id}`
        )
        dispatch(fetchCart());
        // carts = res.data.items
    }
    const clearCart = async () => {
        const res = await axios.post('/api/cart/clear')
        dispatch(fetchCart())
    }

    const handleQuantityChange = async (id, newQuantity) => {
        try {
            await axios.put(`/api/cart`, { productId: id, quantity: newQuantity });
            dispatch(fetchCart())

        } catch (err) {
            console.error("Failed to update quantity:", err);
        }
    };


    const calTotalPrice = () => {
        // console.log(cart)
        var initialVal = 0        
        for (let i = 0; i < cart.length; i++) {
            // console.log(cart[i].quantity * cart[i].productId.price)
            var initialVal = initialVal + (cart[i].quantity * cart[i].productId.price)
        }
        setTotal(initialVal)
        console.log(initialVal)
    }




    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);
    return (

        (cart && cart.length > 0) ?
            (
                <div>
                    <ul className="w-[100%] flex flex-col items-center justify-center gap-8">
                        <li className="flex justify-between text-2xl w-[65%] max-2xl:w-[75%] max-xl:w-[90%] max-xl:text-xl [@media(max-width:575px)]:hidden">
                            <h1 className="pl-2">Product</h1>
                            <div className="flex gap-32 max-xl:gap-25 max-lg:gap-20 max-md:gap-10">
                                <h1>Price</h1>
                                <h1>Quantity</h1>
                                <h1 className="pr-40 max-xl:pr-30 max-lg:pr-15 max-md:pr-11">Subtotal</h1>
                            </div>
                        </li>
                        {
                            (cart || []).map((item, index) => {
                                console.log()
                                return (

                                    <li key={index} className=" flex justify-between text-[#828282] my-5 w-[65%] max-2xl:w-[75%] max-xl:w-[90%] max-lg:h-20 h-30 [@media(max-width:575px)]:hidden">
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
                                                <Counter carty ity={item} onQuantityChange={handleQuantityChange}/>
                                            </div>
                                            <div className="flex items-center gap-35 max-xl:gap-25 max-lg:gap-10 max-md:gap-7.5">
                                                <h3 onClick={() => check(item)}>${item.productId.price - 1}.99</h3>
                                                <CgClose className="text-2xl" onClick={() => delProduct(item)} />
                                            </div>
                                        </div>
                                    </li>

                                )
                            })
                        }
                        {
                            (cart || []).map((item, index) => {
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
                                            <h1 className="text-[#828282]">${item.productId.price - 1}.99</h1>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b-1 border-gray-200">
                                            <h1 className="font-medium  text-[#000000]">Quantity:</h1>
                                            <Counter cart ity={item} onQuantityChange={handleQuantityChange}/>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b-1 border-gray-200">
                                            <h1 className="font-medium text-[#000000]">SubTotal:</h1>
                                            <h1 className="text-[#828282]">${item.productId.price - 1}.99</h1>
                                        </div>
                                        <div className="flex justify-end items-center py-3 border-b-1 border-gray-200">
                                            <CgClose onClick={() => delProduct(item)}/>
                                        </div>
                                    </li>

                                )
                            })
                        }
                    </ul>

                    <div className="w-full flex flex-col items-center justify-center max-lg:mt-10 mt-20 max-sm:mt-5 gap-15">
                        <div className="w-[65%] flex justify-between max-lg:w-[90%]">
                            <Link href={'/shop'}><button className="max-sm:hidden transition duration-300 hover:bg-[#000] hover:text-[#fff] py-3 px-7.5 text-[14px] font-semibold font-sans border-2">CONTINUE SHOPPING</button></Link>
                            <div className="flex gap-5">
                                <button onClick={clearCart} className="transtion duration-300 hover:bg-[#000] hover:text-[#fff] py-3 px-7.5 text-[14px] font-semibold font-sans border-2">CLEAR CART</button>
                                <button onClick={calTotalPrice} className="transtion duration-300 hover:bg-[#fff] bg-[#000] text-[#fff] hover:text-[#000] py-3 px-7.5 text-[14px] font-semibold font-sans border-2">UPDATE CART</button>
                            </div>
                        </div>
                        <div className="w-[65%] max-lg:w-[90%] flex justify-end">
                            <div className="w-60 max-lg:w-[100%]">
                                <div className="flex max-lg:w-60 justify-between text-[#303037] text-lg border-b-1 pb-2 border-[#e2e2e2]">
                                    <h2>Subtotal</h2>
                                    <h2>$ {total}</h2>
                                </div>
                                <div className="flex max-lg:w-60 justify-between text-[#303037] text-lg border-b-1 pb-2 border-[#e2e2e2]">
                                    <h2>Total</h2>
                                    <h2>$ {total}</h2>
                                </div>
                                <div className="flex justify-end mt-5">
                                    <button className="transtion duration-300 hover:bg-[#fff] bg-[#000] text-[#fff] hover:text-[#000] w-full py-3 text-[14px] font-semibold font-sans border-2">PROCEED TO CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            :
            (
                <div className="flex justify-center w-full mt-15">
                    <div className="w-[65%]">
                        <div className="flex gap-5 flex-col w-50">
                            <p className="text-[#828282]">Your cart is currently empty</p>
                            <Link href={'/shop'}><button className=" transtion duration-300 hover:bg-[#fff] bg-[#000] text-[#fff] hover:text-[#000] w-full py-3 text-[14px] font-semibold font-sans border-2">RETURN TO SHOP</button></Link>
                        </div>
                    </div>
                </div>
            )

    )
}

export default CartSection