'use client'
import {CgLink } from "react-icons/cg";
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function CopyUrlButton() {
  const pathname = usePathname()

  const handleCopy = async () => {
    if (typeof window === 'undefined') return
    const fullUrl = window.location.origin + pathname
    await navigator.clipboard.writeText(fullUrl)
    alert('URL copied to clipboard!')
  }

  return (
    <button
      onClick={handleCopy}
      className="cursor-pointer text-[#808080] mt-4"
    //   className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
    >
      <CgLink className="text-xl" />
    </button>
  )
}