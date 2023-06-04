"use client"
import {
  Navbar,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

export function HeaderSecond() {
  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="w-full container mx-auto flex justify-between items-center text-blue-gray-900">
         <Link href="/">
          <Image src="https://media.graphassets.com/4JvM0qeQLyHeRMHl4jw7" width={150} height={100} alt="Logo do like vendas"/>
         </Link>
        <div className="max-w-[100px]">
            <Button variant="gradient" size="sm" fullWidth className="mb-2">
                <Link href="/login">
                <span>Entrar</span>
                </Link>
           </Button>
        </div>
      </div>
      
    </Navbar>    
  )
}