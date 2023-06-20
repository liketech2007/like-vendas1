"use client"
import React from "react";
import {
  Navbar,
  MobileNav,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import Image from "next/image"
import Link from "next/link";
import SideBarDashbord from "./sideBarDashbord";
import { User } from "@phosphor-icons/react";
import { useIdAuth } from "../hooks/useIdAuth";
import { useType } from "@/hooks/useType";
import { useFunctionary } from "@/hooks/useFunctionary";
 
export  function HeaderDashboard() {
  const [openNav, setOpenNav] = React.useState(false);
  const type = useType()
  const functionary = useFunctionary()
  const id_functionary = functionary?.id_functionary

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const id_auth = useIdAuth();
 
 
  return (
    <>
      <Navbar className="sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
        <div>
          <Image src="https://media.graphassets.com/4JvM0qeQLyHeRMHl4jw7" width={150} height={100} alt="Logo do like vendas"/>
         </div>
          <div className="flex items-center gap-4">
          <div className="hidden mb-2 p-2 border border-blue-500 rounded-full w-[50px] h-[50px] lg:flex justify-center items-center hover:bg-blue-500 hover:text-white transition-all">
            <Link href={type === "store" ? `/users/store/${id_auth}/store` : type === "chief" ? `/users/store/${id_auth}/chief` : `/users/store/${id_auth}/functionary/${id_functionary}`}>
            <User size={32}/>
            </Link>
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
        </div>
        <MobileNav className={`${openNav === false && "hidden"}`} open={openNav}>
                <SideBarDashbord />
        </MobileNav>
      </Navbar>
    </>
  );
}