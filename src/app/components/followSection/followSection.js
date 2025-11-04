import React from "react";
import Image from "next/image";

const FollowSection = () => {

    return (
        <div className="flex flex-col justify-center items-center my-20">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold pb-5">FOLLOW US ON INSTAGRAM</h1>
                <p className="text-[#808080]">@BAZAAR</p>
            </div>
            <div className="grid grid-cols-8 cursor-pointer mx-5 max-md:grid-cols-2 [@media(max-width:480px)]:grid-cols-1">
                {["/images/girly2.jpg" , "/images/check.jpg" ,"/images/beach.webp" , "/images/green.jpg" , "/images/white.jpg" , "/images/boy.webp" ,"/images/hat.webp" , "/images/converted.jpg" ].map((item) => {
                        return (
                            <Image
                                src={item}
                                key={item}
                                alt="Follow Us"
                                // w-[clamp(150px,20vw,240px)]
                                className="h-[clamp(100px,12vw,240px)] max-md:h-[clamp(150px,50vw,400px)] [@media(max-width:480px)]:h-[clamp(150px,90vw,450px)]"
                                width={1920}
                                height={1080}
                            />
                        )
                    })}
            </div>
        </div>
    )
}

export default FollowSection;