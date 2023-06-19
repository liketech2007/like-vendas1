"use client"
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Card,
} from "@material-tailwind/react";
import { Bell } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useEffect,useState } from 'react';

type Typedio = "login" | "cadastro" | ""

export const CheckLocalStorage = () => {
  const [typeDio, setTypeDio] = useState<Typedio>("")
  useEffect(() => {
    const checkUserExp = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const { exp } = JSON.parse(userData);
        const expDate = new Date(exp);
        const currentDate = new Date();
        
        if (expDate >= currentDate) {
          
        } else {
          setTypeDio("login")
        }
      } else {
        setTypeDio("cadastro")        
      }
    };
    
    checkUserExp();
  }, []);

  return (
    <>
      {
      typeDio === "login" || typeDio === "cadastro"  ? (
        <Dialog open={true} handler={() => {

        }} className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center">
          <Card className="min-w-[80%] lg:min-w-[24rem] max-w-[80%] lg:max-w-[24rem]">
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Login
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Bell size={48} className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            Sessão expirada
          </Typography>
          <Typography className="text-center font-normal">
            Você precisa fazer login novamente para continuar.
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Link href="/login">
          <Button variant="gradient" >
            Ok
          </Button>
          </Link>
        </DialogFooter>
        </Card>
      </Dialog>
      ) : null }
    </>
  );
};