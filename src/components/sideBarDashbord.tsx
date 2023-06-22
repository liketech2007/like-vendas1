"use client"
import { useFunctionary } from "@/hooks/useFunctionary";
import { useIdAuth } from "@/hooks/useIdAuth";
import { useType } from "@/hooks/useType";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { ChartBar, Cube, HardDrives, House, NotePencil, Rss, SignOut, User, Users } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
 
export default function SideBarDashbord() {
  const id_auth = useIdAuth();
  const router = useRouter();
  const type = useType()
  const functionary = useFunctionary()
  const id_functionary = functionary?.id_functionary
  return (
    <Card className="fixed left-0 h-[calc(100vh-2rem)] w-full max-w-[12rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-2 border border-blue-500 rounded-full w-[50px] h-[50px] flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all">
        <Link href={type === "store" ? `/users/store/${id_auth}/store` : type === "chief" ? `/users/store/${id_auth}/chief` : `/users/store/${id_auth}/functionary/${id_functionary}`}>
        <User size={32}/>
        </Link>
      </div>
      {
        type === "store" || type === "chief" ? (
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
        <Link href={`/users/store/${id_auth}/notas`}>
        <ListItem>
          <ListItemPrefix>
          <NotePencil size={32} />
          </ListItemPrefix>
          Notas
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/services`}>
        </Link>
        <ListItem onClick={() => {
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
        <ListItem>
          <ListItemPrefix>
          <Cube size={32} />
          </ListItemPrefix>
          Produtos
        </ListItem>
        </Link>
        <Link href={`/users/store/${id_auth}/notas`}>
        <ListItem>
          <ListItemPrefix>
           <NotePencil size={32} />
          </ListItemPrefix>
          Notas
        </ListItem>
        </Link>
        <ListItem onClick={() => {
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
  );
}