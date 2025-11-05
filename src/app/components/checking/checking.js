"use client"
import { fetchProducts } from "@/app/features/products/productsSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


const Checking = () => {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.items)

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    console.log(products)

    return (
        <h1>h1</h1>
    )
}

export default Checking