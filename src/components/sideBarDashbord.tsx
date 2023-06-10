"use client"
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import { ChartBar, Cube, HardDrives, House, Rss, SignOut, Users } from "@phosphor-icons/react";
import Link from "next/link";
 
export default function SideBarDashbord() {
  return (
    <Card className=" h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 lg:shadow-xl lg:shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
      <Link href="#" className="border rounded-full border-blue-500">
              <Avatar src="/img/face-2.jpg" alt="foto do user" />
      </Link>
      </div>
      <List>
        <ListItem>
          <Link href="#" className="flex gap-3">
          <ListItemPrefix>
          <House size={32} />
          </ListItemPrefix>
          Dashboard
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#" className="flex gap-3">
          <ListItemPrefix>
          <ChartBar size={32} />
          </ListItemPrefix>
          Analisar
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#" className="flex gap-3">
          <ListItemPrefix>
          <Rss size={32} />
          </ListItemPrefix>
          Feed
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#" className="flex gap-3">
          <ListItemPrefix>
          <Users size={32} />
          </ListItemPrefix>
          Funcionarios
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#" className="flex gap-3">
          <ListItemPrefix>
          <Cube size={32} />
          </ListItemPrefix>
          Produtos
          </Link>
        </ListItem>
        <ListItem>
          <Link href="#" className="flex gap-3">
          <ListItemPrefix>
          <HardDrives size={32} />
          </ListItemPrefix>
          Serviços
          </Link>
        </ListItem>
        <ListItem onClick={() => {
          localStorage.removeItem("user")
          window.location.href = "/login"
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