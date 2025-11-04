'use client'
import { CgClose } from "react-icons/cg";

import { useState, useEffect } from 'react'

// componensts
import Tooltip from './Tooltip'


import Image from 'next/image'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function ImageModal({ src, trigger }) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        AOS.init({ duration: 500 })
    }, [])

    return (
        <>

            {trigger && (
                <div onClick={() => setOpen(true)} className="cursor-pointer ">
                    {trigger}
                </div>
            )}

            {open && (
                // [40%] max-xl:w-150
                <div className="z-5 fixed inset-0 flex justify-center items-center bg-[#FFFFFF] ">
                    <div className="h-[90%] w-150 max-md:h-auto max-md:mx-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] " data-aos="fade">
                        <Image
                            src={src}
                            height={1920}
                            width={1080}
                            alt={"Modal Image"}
                            priority={true}
                            className="h-full w-full"
                        />
                    </div>
                    <button
                        className="absolute top-7.5 right-5 cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <CgClose className="text-2xl" />
                    </button>
                </div>
            )}
        </>
    )
}