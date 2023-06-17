"use client"

import { useEffect, useState } from "react"

interface IUseFunctionary {
    id_store: number,
    id_functionary: number
}

export function useFunctionary() {
  const [user,setUser] = useState<IUseFunctionary | null>(null)

  useEffect(() => {
    const user = JSON.parse(`${localStorage.getItem("functionary")}`)
    
    setUser(user)
  },[])

  if(user !== null) {
    return user
  }
}