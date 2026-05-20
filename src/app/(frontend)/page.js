"use client"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"


// components:
import Header from "../components/header/header";
import Navbar from "../components/navbar/navbar";
import Hero from "../components/hero/hero";
import ImageSection from "../components/imageSection/imageSection";
import FollowSection from "../components/followSection/followSection";
import ProductSection from "../components/productSection/productSection";
import Footer from "../components/footer/footer";


// Libraries:
import Aos from "aos";
import "aos/dist/aos.css";

import { fetchUserFromCookie } from "../features/auth/authSlice";
import { fetchCart } from "../features/carts/cartSlice";

// Images:

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserFromCookie())
    dispatch(fetchCart())
  }, [dispatch])
  


  useEffect(() => {
    Aos.init({ once: true, duration: 800 });
  }, []); 

  return (
    <div>
      <Header />
      <Navbar />
      <Hero />
      <ImageSection />
      <ProductSection/>
      <FollowSection/>
      <Footer />
      
      
    </div>
  )
}


export default App

