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
import { Info, Link } from "@phosphor-icons/react";

export function MainSuporte() {
    return (
        <Dialog open={true} handler={() => {

        }} className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center">
        <Card className="min-w-[80%] lg:min-w-[24rem] max-w-[80%] lg:max-w-[24rem]">
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Suporte
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <Info size={48} className="h-16 w-16 text-blue-500" />
          <Typography color="bg-blue-500" variant="h4">
            Nosso suporte
          </Typography>
          <Typography>
            Enviemos a tua dúvida iremos responder em menos de 2 horas <br />

            <ul className="m-6 flex flex-col gap-3">
                <li>Email: <a href="mailto:agenciacover1@gmail.com">agenciacover1@gmail.com</a></li>
                <li>Número de Telefone: <a href="tel:+244958552605">958552605</a></li>
                <li>Instagram: <a href="https://www.instagram.com/agenciacover1/">agenciacover1</a></li>
            </ul>
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Link href="https://is.gd/ZQ0uVd">
          <Button variant="gradient" className="bg-green-500 text-white p-3 rounded-full hover:bg-white hover:text-green-500 transition-all">
            WhatsApp
          </Button>
          </Link>
        </DialogFooter>
        </Card>
      </Dialog>
    )
}