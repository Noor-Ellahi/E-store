import Image from "next/image";
import { FaLinkedinIn, FaFacebookF, FaGithub } from "react-icons/fa";

import React from "react";
import Tooltip from "../Tooltip";


const AboutComponent = () => {


    return (

        <div className="flex justify-center mt-25 max-lg:mt-10">
            <div className="w-280 flex max-xl:w-260 bg-re-100 justify-between max-lg:w-[95%] max-lg:justify-center">
                <div className="w-[50%] max-sm:px-3 px-10 h-full flex flex-col justify-between max-lg:w-180">
                    <div>
                        <h1 className="text-[43px] pb-5 scale-y-95 text-[#373737]">Our Story</h1>
                        <p className="text-[#8b8b8b]">“Simple is the best”, they say. Indeed, it is. At Bixbang., we put a strong emphasis on simplicity, quality and usefulness of fashion products over
                            other factors. Our fashion items never get outdated. They are not short-lived as normal fashion clothes. Moreover, with more than
                            10 years of operating in this field, our staff know best what our customers are looking for and bring them just what they need in style.
                        </p>
                    </div>
                    <div className="flex flex-col gap-7.5 max-xl:gap-4 max-xl:pt-5">
                        <h1 className="text-[43px] scale-y-95 text-[#373737]">Contact</h1>
                        <ul className="text-[#4f4f4f] text-[16px] font-medium flex flex-col gap-1">
                            <li >70 Washington Square South, New York, NY 10012, United States</li>
                            <li>+92 423 567</li>
                            <li>info@bixbang.com</li>
                        </ul>
                        <ul className="flex gap-5 text-[#676767]">
                            <li>
                                <Tooltip text="Facebook" position="top">
                                    <FaFacebookF className="transition duration-500 hover:text-[#000]" />
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip text="GitHub" position="top">
                                    <FaGithub className="transition duration-500 hover:text-[#000]" />
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip text="LinkedIn" position="top">
                                    <FaLinkedinIn className="transition duration-500 hover:text-[#000]" />
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-[50%] max-xl:w-[45%] max-lg:hidden">
                    <Image className="h-[95%] w-[95%]  max-xl:h-[85%]" src={'/images/aboutparaImg.jpg'} width={1080} height={1600} priority={true} alt="aboutImg" />
                </div>
            </div>
        </div>

    )
}


export default AboutComponent