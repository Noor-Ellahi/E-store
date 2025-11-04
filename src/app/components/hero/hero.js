
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";



const Hero = () => {

    const slides = [
        {
            title: ['The Exclusive', 'Winter collections.'],
            text: "starting season 2022",
            img: "/images/green.jpg",
        },
        {
            title: ['Our favorites', 'Looks for your style'],
            text: "starting season 2022",
            background: 'bg-[#D5E0EB]',
            img: "/images/converted.jpg",
        },
        {
            title: ['Spring 2022', 'trends for women'],
            text: "starting season 2022",
            background: 'bg-[#ECE9DF]',
            img: "/images/check.jpg",
        },
    ];

    const [index, setIndex] = useState(0);
    const current = slides[index];

    useEffect(() => {
        Aos.init({
            duration: 100,
            once: false,
        });
    }, []);

    // Change slide + re-trigger AOS every 5 s
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);

            // Wait a bit for React to render new slide, then refresh AOS
            setTimeout(() => {
                Aos.refresh();
                const elements = document.querySelectorAll("[data-aos]");
                elements.forEach((el) => {
                    el.classList.remove("aos-animate");
                    void el.offsetWidth; // force reflow
                    el.classList.add("aos-animate");
                });
            }, 300);
        }, 25000);

        return () => clearInterval(timer);
    }, [slides.length]);


    return (
        // px-30
        <div className={` min-h-[200px] max-h-[80vh] flex w-[100%] bg-[#FAFAFA] px-2 md:px-4 xl:px-25 `}  >
            <div className={`w-[50%] flex flex-col items-end justify-center relative z-[5]  ${current ? current.background : "bg-[#FBFAF6]"}`} key={current.background} data-aos="fade-in" >
                <p className="rotate-270 absolute left-[-110] text-[13px] text-gray-500 max-lg:hidden">SIGN UP TODAY TO GET 10% off FOR ALL ITEMS</p>
                <div className="max-md:hidden absolute top-30 right-15 bg-[url('/2024.png')] bg-cover bg-center bg-no-repeat opacity-5 z-[0] w-[40vh] h-[40vh]" style={{ backgroundImage: "url(/images/2024.png)" }}>

                </div>
                {/* text-[clamp(24px,3.1vw,70px)] */}
                <div className="w-[auto] absolute right-[-30] flex flex-col items-start gap-6 max-lg:gap-4  "  >
                    <h1 key={current.title} className=" font-medium text-[clamp(24px,5vw,50px)] leading-[60px] z-[22] max-lg:leading-[60px] max-md:leading-[50px] 
                    [@media(max-width:550px)]:leading-[35px] max-sm:tracking-wider [@media(max-width:450px)]:text-[22px]"
                        data-aos="fade-left" data-aos-delay="500">{current.title[0]} <br /> {current.title[1]}</h1>
                    <p className="text-[clamp(16px,2vw,22px)]" data-aos="fade-left" data-aos-delay="700" key={current.text}>{current.text}</p>
                    <Link href={"/shop"} >
                        <button className="cursor-pointer py-2 px-5 text-sm border-[2px]  max-sm:px-3.5 max-sm:py-1.5" data-aos="fade-left" data-aos-delay="900">SHOP NOW</button>
                    </Link>
                </div>
            </div>
            <div key={current.img} className={`w-[50%] z-[1] ${current ? current.background : "bg-[#FBFAF6]"}`} data-aos="fade-down" data-aos-delay="100">
                <Image
                    className="w-[100%] h-[100%] z-[1]"
                    src={current.img}
                    width={1920}
                    height={1080}
                    alt="background"
                    priority={true}
                />
            </div>
        </div>
    )
}


export default Hero
