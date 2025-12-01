import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";


// componenets

const Forget = () => {


    return (
        <div className="bg-[#FAFAFA]">
            <Link href={"/"} className="absolute top-5 left-5 flex items-center gap-2 transition duration-500 hover:text-[#2240f5]"><FaArrowLeft className="text-sm" />HOME</Link>
            <div className="flex justify-center items-center h-[100vh]">
                <div className="text-center w-[300px]">
                    <div>
                        <h2 className="text-4xl font-serif pb-5 scale-y-150"> BAZAAR</h2>
                        <h1 className="text-2xl font-light mb-4 text-[#8c8c8c]">Forget password?</h1>
                        <p className="text-sm">We'll email you a password reset code.</p>
                    </div>
                    <div className="w-full relative mt-5">
                        <input type="email" placeholder="Enter your email" className="peer block bg-white py-2.5 pl-2 rounded-sm focus:border-blue-500 border-1 border-[#DADCE0] border-solid w-[100%] outline-none placeholder-transparent" />
                        <label
                            htmlFor="email"
                            className="absolute left-3 bottom-full text-gray-500 text-sm transition-all
                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                        peer-focus:top-[0] peer-focus:text-blue-500 peer-focus:text-[10px]"
                        >
                            Email
                        </label>
                    </div>
                    <div className="flex flex-col gap-5">
                        <button className="w-full bg-[#2240f5] text-[#fff] py-2 mt-5 rounded-sm transition hover:shadow-lg cursor-pointer">SEND</button>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-[2px] bg-[#DADCE0] w-30"></div>
                            <p className="text-[#8c8c8c]">or</p>
                            <div className="h-[2px] bg-[#DADCE0] w-30"></div>
                        </div>
                        <Link href={'/login'}><p className="underline text-[#3C56F6]">Return to Sign in</p></Link>

                    </div>
                </div>
            </div>
        </div>
    )
}


export default Forget;