"use client"

import { useEffect, useState } from "react"

export function useUserLocalStorage() {
  const [user,setUser] = useState(null)

  useEffect(() => {
    const user = JSON.parse(`${localStorage.getItem("user")}`)
    
    setUser(user.data)
  },[])

  if(user !== null) {
    return user
  }
}