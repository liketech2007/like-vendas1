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

type Typedio = "exp" | "";

export const CheckPay = () => {
  const [typeDio, setTypeDio] = useState<Typedio>("")
  useEffect(() => {
    const checkUserExp = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        const { data } = JSON.parse(userData);
        const expDate = new Date(data.end_service_date);
        const currentDate = new Date();
        if (expDate >= currentDate) {
          
        } else {
          setTypeDio("exp")
        }
      } else {
        
      }
    };
    
    checkUserExp();
  }, []);

  return (
    <>
      {
      typeDio === "exp"  ? (
        <Dialog open={true} handler={() => {

        }} className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center">
        <Card className="min-w-[80%] lg:min-w-[24rem] max-w-[80%] lg:max-w-[24rem]">
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Pagamento
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Bell size={48} className="h-16 w-16 text-red-500" />
          <Typography color="red" variant="h4">
            Serviço expirado
          </Typography>
          <Typography className="text-center font-normal">
            Você precisa fazer pagamento novamente para continuar.
          </Typography>
          <Typography className="text-center font-normal">
            Valor de pagamento: 6.000KZ
          </Typography>
          <Typography className="text-center font-normal">
            IBAN: jegiuroshjgenmgneio <br />
            Envia o comprovativo no whatsapp 944 757 305
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


