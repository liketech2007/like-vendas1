"use client"

import { useEffect, useState } from "react"

export function useType() {
const [type,setType] = useState<"store" | "functionary" | "chief" |  null | any>(null)

  useEffect(() => {
    const type = localStorage.getItem("type")
    
    type !== null && setType(type)
  },[])

  if(type !== null) {
    return type
  }
}