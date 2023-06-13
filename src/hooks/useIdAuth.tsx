"use client"
import { useEffect, useState } from "react";

export function useIdAuth() {
  const [id_auth, setId_auth] = useState(null);
  useEffect(() => {
    const user = JSON.parse(`${localStorage.getItem("user")}`);
    const id_auth = user.data.id_auth;
    setId_auth(id_auth);
  },[])
  if(id_auth !== null){
    return id_auth;
  }
}