"use client"
import { useFunctionary } from "@/hooks/useFunctionary";
import { useIdAuth } from "@/hooks/useIdAuth";
import { useType } from "@/hooks/useType";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { ChartBar, Cube, HardDrives, House, Info, NotePencil, Rss, SignOut, User, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MainSuporte } from "./mainSuporte";
 
export default function SideBarDashbord() {
  const id_auth = useIdAuth();
  const router = useRouter();
  const [openSuporte,setOpenSuporte] = useState(false)
  const type = useType()
  const functionary = useFunctionary()
  const id_functionary = functionary?.id_functionary
  const handleOpen = () => {
    setOpenSuporte((cur) => !cur);
  }
  return (
    <>
    {
      openSuporte && (
        <Dialog open={openSuporte} handler={handleOpen} className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center">
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
        <DialogFooter className="space-x-2 pt-0 flex gap-3 justify-center items-start p-4">
        <Button onClick={handleOpen} className="bg-transparent text-black" >
                Cancelar
          </Button>
          <Link href="#">
          <Button className="bg-green-500 text-white p-3 rounded-full hover:bg-white hover:text-green-500 transition-all">
            WhatsApp
          </Button>
          </Link>
        </DialogFooter>
        </Card>
      </Dialog>
      )
    }
      <Card className="fixed left-0 h-[calc(100vh-2rem)] w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-500 text-white rounded-none">
      <div className="mb-2 p-2 border border-white rounded-full  w-[50px] h-[50px] flex justify-center items-center hover:bg-white hover:text-blue-500 transition-all">
        <Link href={type === "store" ? `/users/store/${id_auth}/store` : type === "chief" ? `/users/store/${id_auth}/chief` : `/users/store/${id_auth}/functionary/${id_functionary}`}>
        <User size={32}/>
        </Link>
      </div>
      {
        type === "store" || type === "chief" ? (
          <List>
       <Link href={`/users/store/${id_auth}/dashboard`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <House size={32} />
          </ListItemPrefix>
           Dashboard
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/analisar`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <ChartBar size={32} />
          </ListItemPrefix>
          Analisar
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/feed`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <Rss size={32} />
          </ListItemPrefix>
          Feed
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/functionarys`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <Users size={32} />
          </ListItemPrefix>
          Funcionários
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/products`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <Cube size={32} />
          </ListItemPrefix>
          Produtos
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/notas`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <NotePencil size={32} />
          </ListItemPrefix>
          Notas
        </ListItem>
        </Link>
        <ListItem className="text-white" onClick={() => setOpenSuporte(true)}>
          <ListItemPrefix>
          <Info size={32} />
          </ListItemPrefix>
          Suporte
        </ListItem>
        <Link href={`/users/store/${id_auth}/services`}>
        </Link>
        <ListItem className="text-white" onClick={() => {
          localStorage.removeItem("user")
          localStorage.removeItem("functionary")
          localStorage.removeItem("type")
          router.push("/login")
        }}>
          <ListItemPrefix>
          <SignOut size={32} />
          </ListItemPrefix>
          Sair
        </ListItem>
      </List>
        ) : (
          <List>
        <Link href={`/users/store/${id_auth}/products`}>
        <ListItem className="text-white">
          <ListItemPrefix>
          <Cube size={32} />
          </ListItemPrefix>
          Produtos
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/notas`}>
        <ListItem className="text-white">
          <ListItemPrefix>
           <NotePencil size={32} />
          </ListItemPrefix>
          Notas
        </ListItem>
        </Link>
        <ListItem className="text-white" onClick={() => setOpenSuporte(true)}>
          <ListItemPrefix>
          <Info size={32} />
          </ListItemPrefix>
          Suporte
        </ListItem>
        <ListItem className="text-white" onClick={() => {
          localStorage.removeItem("user")
          localStorage.removeItem("functionary")
          localStorage.removeItem("type")
          router.push("/login")
        }}>
          <ListItemPrefix>
          <SignOut size={32} />
          </ListItemPrefix>
          Sair
        </ListItem>
      </List>
        )
      }
    </Card>
    </>
  );
}