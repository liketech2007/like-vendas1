"use client"
import { Typography } from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
 
export default function Footer() {
  return (
    <footer className="w-full bg-white p-8">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
      <Link href="/">
          <Image src="https://media.graphassets.com/4JvM0qeQLyHeRMHl4jw7" width={150} height={100} alt="Logo do like vendas"/>
         </Link>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link href="/sobre-nos">
                Sobre Nós
              </Link>
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link href="/contactos">
                Contactos
              </Link>
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              <Link href="/politica-de-privacidade">
                Política de privacidade
              </Link>
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
             <Link href="/cadastro">
               Criar Conta
              </Link>
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal">
        &copy; 2023 Like Vendas
      </Typography>
    </footer>
  );
}