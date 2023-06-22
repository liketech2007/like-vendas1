"use client"
import { useState } from "react"
import HeaderAdim from "./headerAdim"
import { MainAdim } from "./mainAdim"

export function PageAdim({ data }: any) {
    const [isStores,setIsStores] = useState(true)
    return (
        <>
            <HeaderAdim isStores={isStores} setIsStores={setIsStores} />  
            <MainAdim isStores={isStores} data={data} />      
        </>
    )
}