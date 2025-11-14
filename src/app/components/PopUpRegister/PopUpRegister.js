import Link from "next/link";
import React from "react";
import { CgClose } from "react-icons/cg";
import Aos from "aos";


const PopUpCredit = ({setPop}) => {
    
//  ${pop ? "" : "hidden"}
    return (
        <div className={`inset-0 fixed flex h-screen w-full items-center bg-[#fff]/95 justify-center z-20`}>
            <div data-aos="fade" data-aos-delay="250" className={`shadow-xl/20 pt-2 relative bg-[#fff] h-60 w-100 flex flex-col justify-around items-center`}>
                <CgClose className="absolute text-2xl right-5 top-5" onClick={() => setPop(false)} />
                <p className="text-[#7b7b77] text-2xl">Please Login or Register first!</p>
                <div>
                    <Link href={'login'}><button className=" transtion duration-300 hover:bg-[#000] bg-[#fff] text-[#000] hover:text-[#fff] px-15 py-2.5 text-[14px] font-semibold font-sans border-2">Login</button></Link>
                    <Link href={'register'}><button className=" transtion ml-2 duration-300 hover:bg-[#000] bg-[#fff] text-[#000] hover:text-[#fff] px-15 py-2.5 text-[14px] font-semibold font-sans border-2">Register</button></Link>
                </div>
            </div>
        </div>
    )
}

export default PopUpCredit