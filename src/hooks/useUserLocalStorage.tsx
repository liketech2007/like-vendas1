"use client"

import { useEffect, useState } from "react"
import { ILoja } from "@/types/loja";

export function useUserLocalStorage() {
  const [user,setUser] = useState<ILoja | null>(null)

  useEffect(() => {
    const user = JSON.parse(`${localStorage.getItem("user")}`)
    
    setUser(user.data)
  },[])

  if(user !== null) {
    return user
  }
}