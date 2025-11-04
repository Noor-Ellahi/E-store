// // app/components/Tooltip.jsx
"use client";
import { useState } from "react";



export default function Tooltip({ children, text, position = "top" }) {
    let [visible, setVisible] = useState(false);
    
    
    const positions = {
        cardRight : "after:left-[75%] bottom-full left-1/2 mb-2 -translate-x-4/5 after:top-full after:border-t-black origin-bottom scale-y-0  group-hover:scale-y-110",
        cardLeft : "after:left-[25%] bottom-full left-1/2 mb-2 -translate-x-1/5 after:top-full after:border-t-black origin-bottom scale-y-0  group-hover:scale-y-110",
        top: "after:left-[45%] bottom-full left-1/2 mb-2 -translate-x-1/2 after:top-full after:border-t-black origin-bottom scale-y-0  group-hover:scale-y-110",
        bottom: "after:left-[45%] top-full left-1/2 -translate-x-1/2 after:bottom-full after:border-b-black origin-top scale-y-0  group-hover:scale-y-110",
        left: "after:top-1/2 after:-translate-y-1/2 right-full top-1/2 -translate-y-1/2 after:left-full after:border-l-black origin-right scale-x-0  group-hover:scale-x-110",
        right: "after:top-1/2 ml-1 after:-translate-y-1/2 left-full  top-1/2 -translate-y-1/2 after:right-full after:border-r-black origin-left scale-x-0  group-hover:scale-x-110",
    };

    return (
        <div className="relative group inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
            {children}
            
            <span
                className={`
        absolute 
        bg-[#303030] text-white text-[12px]
        whitespace-nowrap
        px-0 py-1 opacity-0 scale-y-0 
        transition-all duration-500 
        ease-[cubic-bezier(0.68,-0.55,0.27,1.55)] 
        ${visible ? "group-hover:opacity-100 group-hover:scale-y-110 group-hover:px-3 group-hover:delay-100" : ""}

        after:content-[''] after:absolute  
        after:border-6 after:border-transparent 
        ${positions[position]}
        `}
        >
{/* group-hover:opacity-100 group-hover:scale-y-110 group-hover:px-3 group-hover:delay-100 */}
                {text}
            </span>
        </div>
    );
}

