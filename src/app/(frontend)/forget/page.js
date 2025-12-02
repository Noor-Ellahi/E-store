'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";


// componenets

const Forget = () => {
    // Router
    const router = useRouter();

    const [step, setStep] = useState(1)

    const [code, setCode] = useState(Array(6).fill(""));
    const inputsRef = useRef([]);

    // Value Refs
    const emailRef = useRef(null);
    const pass1Ref = useRef(null);
    const pass2Ref = useRef(null);

    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        // Simple regex for email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const emailCheck = async () => {
        const email = emailRef.current.value.trim();

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email.");
            return;
        }

        setLoading(true); // start loading
        // Here you would typically validate the email and send the reset code
        try {
            const res = await axios.post(
                '/api/auth/forget-password/verify-email',
                {
                    email: emailRef.current.value
                }
            )
            console.log(res)
            setStep(2);
            toast.success("Verification code sent to your email.");
        } catch (error) {
            console.error("Error sending verification code:", error);
            toast.error(error.response?.data.error || "Something went wrong");
        }
        finally {
            setLoading(false); // stop loading
        }
    }
    const codeCheck = async () => {
        const fullCode = code.join("");

        if (fullCode.length !== 6) {
            toast.error("Please enter the full 6-digit code.");
            return;
        }
        try {
            const res = await axios.post(
                '/api/auth/forget-password/verify-code',
                {
                    verifyCode: fullCode
                }
            )
            setStep(3);
            toast.success("Code verified. You can now reset your password.");
        } catch (error) {
            console.error("Error verifying code:", error);
            toast.error(error.response?.data.error || "Something went wrong");
        }
    }


    const resetPass = async () => {
        const pass1 = pass1Ref.current.value;
        const pass2 = pass2Ref.current.value;

        if (pass1 !== pass2) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
            const res = await axios.post(
                '/api/auth/forget-password/new-password',
                {
                    newPassword: pass1,
                    RePassword: pass2
                }
            )
            toast.success("Password reset successfully. You can now log in with your new password.");
            router.push('/');

        } catch (error) {
            console.error("Error resetting password:", error);
            toast.error(error.response?.data.error || "Something went wrong");
        }
    }

    // Input functions
    const handleChange = (e, idx) => {
        const v = e.target.value.replace(/[^0-9]/g, ""); // keep only digits
        const updated = [...code];
        updated[idx] = v;
        setCode(updated);

        if (v && idx < 5) inputsRef.current[idx + 1].focus();
    };
    const handleKeyDown = (e, idx) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputsRef.current[idx - 1].focus();
        }
    };


    return (
        <div className="bg-[#FAFAFA]">
            <div className={`fade ${step === 1 ? "fade-show" : "fade-hidden"}`}>
                <Link href={"/"} className="absolute top-5 left-5 flex items-center gap-2 transition duration-500 hover:text-[#2240f5]"><FaArrowLeft className="text-sm" />HOME</Link>
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="text-center w-[300px]">
                        <div>
                            <h2 className="text-4xl font-serif pb-5 scale-y-150"> BAZAAR</h2>
                            <h1 className="text-2xl font-light mb-4 text-[#8c8c8c]">Forget password?</h1>
                            <p className="text-sm">We'll email you a password reset code.</p>
                        </div>
                        <div className="w-full relative mt-5">
                            <input ref={emailRef} type="email" placeholder="Enter your email" className="peer block bg-white py-2.5 pl-2 rounded-sm focus:border-blue-500 border-1 border-[#DADCE0] border-solid w-[100%] outline-none placeholder-transparent" />
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
                            <button disabled={loading} className="w-full bg-[#2240f5] text-[#fff] py-2 mt-5 rounded-sm transition hover:shadow-lg cursor-pointer" onClick={emailCheck}>SEND</button>
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
            <div className={`fade ${step === 2 ? "fade-show" : "fade-hidden"}`}>
                <Link href={"/"} className="absolute top-5 left-5 flex items-center gap-2 transition duration-500 hover:text-[#2240f5]"><FaArrowLeft className="text-sm" />HOME</Link>
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="text-center w-[300px]">
                        <h2 className="text-4xl font-serif pb-5 scale-y-150"> BAZAAR</h2>
                        <h2 className="text-3xl font-semibold mb-3">Enter Code</h2>
                        <p className="text-sm text-[#8c8c8c] mb-4">We sent a 6‑digit code to your email.</p>


                        <div className="flex gap-2 justify-center my-5">

                            {code.map((c, idx) => (
                                <input
                                    key={idx}
                                    ref={(el) => (inputsRef.current[idx] = el)}
                                    maxLength={1}
                                    value={c}
                                    onChange={(e) => handleChange(e, idx)}
                                    onKeyDown={(e) => handleKeyDown(e, idx)}
                                    className="w-12 h-12 text-center text-xl rounded-md border border-gray-300 focus:border-blue-500 outline-none"
                                />
                            ))}
                        </div>


                        <button className="w-full bg-[#2240f5] text-white py-2 rounded-sm hover:shadow-lg mt-4" onClick={codeCheck}>VERIFY</button>
                    </div>
                </div>
            </div>
            <div className={`fade ${step === 3 ? "fade-show" : "fade-hidden"}`}>
                <Link href={'/'} className="absolute top-5 left-5 flex items-center gap-2 transition duration-500 hover:text-[#2240f5]"><FaArrowLeft className="text-sm" />HOME</Link>
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="text-center w-[300px]">
                        <h2 className="text-4xl font-serif pb-5 scale-y-150"> BAZAAR</h2>
                        <h2 className="text-3xl font-semibold mb-3">Set New Password</h2>
                        <p className="text-sm text-[#8c8c8c] mb-4">Enter your new password below.</p>


                        <input ref={pass1Ref} type="password" placeholder="New password" className="w-full mb-3 bg-white py-2.5 pl-2 rounded-sm border border-[#DADCE0] outline-none focus:border-blue-500" />
                        <input ref={pass2Ref} type="password" placeholder="Re-enter password" className="w-full mb-5 bg-white py-2.5 pl-2 rounded-sm border border-[#DADCE0] outline-none focus:border-blue-500" />


                        <button className="w-full bg-[#2240f5] text-white py-2 rounded-sm hover:shadow-lg mt-2" onClick={resetPass}>RESET PASSWORD</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Forget;