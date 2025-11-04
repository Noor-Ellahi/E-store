"use client"

import React, { useEffect } from "react";

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
import axios from "axios";



// Images:

const App = () => {
  const imgUrl = "/images/kirkdik.jpg"

  const userChecker = async () => {
    const apiUrl = "http://localhost:3000/api/auth/login"

    try {
      const res = await axios({
        method: "POST",
        url: apiUrl,
        data: {
          email: "farooq@gmail.com",
          password: "Farooq123"
        }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


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

