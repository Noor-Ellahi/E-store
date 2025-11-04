import React from "react";
import { FaLinkedinIn,FaFacebookF,FaGithub } from "react-icons/fa";
import Tooltip from "../Tooltip";


const Footer = () => {

    return(
        <div className="w-full py-12 px-20 flex justify-between max-sm:px-5">
            <div>
                <p className="max-sm:text-sm">© <span className="font-medium">2024 BAZAAR.</span> All rights reserved.</p>
            </div>

            <div className="flex gap-5 text-[#808080]">
                <Tooltip text="Facebook" position="top">
                    <FaFacebookF className="transition duration-500 hover:text-[#000]"/>
                </Tooltip>
                <Tooltip text="GitHub" position="top">
                    <FaGithub className="transition duration-500 hover:text-[#000]"/>
                </Tooltip>
                <Tooltip text="LinkedIn" position="top">
                    <FaLinkedinIn className="transition duration-500 hover:text-[#000]"/>
                </Tooltip>
            </div>
        </div>
    )

}

export default Footer;