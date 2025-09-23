import React from 'react'

export default function Button({ className, type, onClick, text, secondary, fullwidth }) {
    const variants = {
        primary: "px-8 py-3 text-sm text-white cursor-pointer rounded-md bg-primary hover:bg-primary-hover",
        secondary: 'px-8 py-3 text-primary text-sm cursor-pointer bg-white rounded-md bg-primary hover:text-white hover:bg-primary border-1 border-primary'
    }
    
    return (
        <button type={!type ? "button" : type} className={`${secondary ? variants.secondary : variants.primary} ${className} ${fullwidth}`} onClick={onClick}>{text}</button>
    )
}
