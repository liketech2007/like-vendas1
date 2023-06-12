"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";

export function MainFunctionary() {
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Functionary 1
      </Typography>
    </div>  
    </main>  
  )
}