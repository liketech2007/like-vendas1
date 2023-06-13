"use client"
import { useIdAuth } from "@/hooks/useIdAuth";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { ChartBar, Cube, HardDrives, House, Rss, SignOut, User, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
export default function SideBarDashbord() {
  const id_auth = useIdAuth();
  const router = useRouter();
  return (
    <Card className="fixed h-[calc(100vh-2rem)] w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-2 border border-blue-500 rounded-full w-[50px] h-[50px] flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all">
        <Link href={`/users/store/${id_auth}/store`}>
        <User size={32}/>
        </Link>
      </div>
      <List>
      <Link href={`/users/store/${id_auth}/dashboard`}>
        <ListItem>
          <ListItemPrefix>
          <House size={32} />
          </ListItemPrefix>
           Dashboard
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/analisar`}>
        <ListItem>
          <ListItemPrefix>
          <ChartBar size={32} />
          </ListItemPrefix>
          Analisar
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/feed`}>
        <ListItem>
          <ListItemPrefix>
          <Rss size={32} />
          </ListItemPrefix>
          Feed
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/functionarys`}>
        <ListItem>
          <ListItemPrefix>
          <Users size={32} />
          </ListItemPrefix>
          Funcionários
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/products`}>
        <ListItem>
          <ListItemPrefix>
          <Cube size={32} />
          </ListItemPrefix>
          Produtos
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/services`}>
        <ListItem>
          <ListItemPrefix>
          <HardDrives size={32} />
          </ListItemPrefix>
          Serviços
        </ListItem>
        </Link>
        <ListItem onClick={() => {
          localStorage.removeItem("user")
          router.push("/login")
        }}>
          <ListItemPrefix>
          <SignOut size={32} />
          </ListItemPrefix>
          Sair
        </ListItem>
      </List>
    </Card>
  );
}