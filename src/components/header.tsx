"use client"
import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
 
export default function Header() {
  const [openNav, setOpenNav] = useState(false);
 
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col justify-center items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#proposito" className="flex items-center">
          Propósito
        </Link>
      </Typography>
      
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="/sobre-nos" className="flex items-center">
          Sobre Nós
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#price" className="flex items-center">
          Preços
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link href="#melhore" className="flex items-center">
          melhore o teu negócio
        </Link>
      </Typography>
    </ul>
  );
 
  return (
    <Navbar className="w-full mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
         <Link href="#">
          <Image src="https://media.graphassets.com/4JvM0qeQLyHeRMHl4jw7" width={150} height={100} alt="Logo do like vendas"/>
         </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="max-w-[150px]">
        <Button variant="gradient" size="sm" fullWidth className="mb-2 hidden lg:block">
            <Link href="/cadastro">
            <span>Cadastra-se já</span>
            </Link>
          </Button>
         </div> 
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto flex flex-col justify-center items-end">
          {navList}
          <div className="max-w-[150px]">
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <Link href="/cadastro">
            <span>Cadastra-se já</span>
            </Link>
          </Button>
          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}