'use client'
import { useState } from 'react'
import { LuPlus, LuMinus } from 'react-icons/lu'

export default function QuantityCounter({ initial = 1 , carty ,cart}) {
  const [count, setCount] = useState(initial)

  const increment = () => setCount(prev => prev + 1)
  const decrement = () => setCount(prev => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="border flex items-center">
      <button onClick={decrement} className={`${carty ? "py-4" : ""} ${cart ? "py-3":""} px-5 max-md:px-2`}><LuMinus /></button>
      <span className="mx-2">{count}</span>
      <button onClick={increment} className={`${carty ? "py-4" : ""} px-5 max-md:px-2`}><LuPlus /></button>
    </div>
  )
}