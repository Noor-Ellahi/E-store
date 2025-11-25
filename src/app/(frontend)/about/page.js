import Header from "@/app/components/header/header";
import Navbar from "@/app/components/navbar/navbar";
import PageDefiner from "@/app/components/PageDefiner/PageDefiner";
import React from "react";
import Image from "next/image";
import AboutComponent from "@/app/components/AboutComponent/AboutComponent";
import FollowSection from "@/app/components/followSection/followSection";
import Footer from "@/app/components/footer/footer";

const About = () => {

    return (
        <>
            <Header />
            <Navbar />
            <PageDefiner head={"About"} para={"Quickly Pack your items!"} />
            <div className=" h-[clamp(35vh,55vw,55vh)] max-m:h-100 w-full flex justify-center py-5  overflow-hidden relative">
                <Image className="h-[clamp(35vh,55vw,140vh)] w-[95%] max-md:w-[100%] absolute " src={'/images/aboutImg.jpg'} width={1080} height={1920} priority={true} alt="frontImg" />
            </div>
            <AboutComponent />
            <FollowSection />
            <Footer />
        </>
    )
}


export default About