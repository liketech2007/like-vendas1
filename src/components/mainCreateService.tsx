"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { FormService } from "./formService";

export function MainCreateService() {
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Serviço
      </Typography>

      <div className="min-w-full flex flex-col justify-center items-center min-h-[50vh] gap-4 lg:flex-row mt-8">
        {/* <div className="max-w-[300px]">
          <img src="https://media.graphassets.com/Ad3UMdXLQkuZqMdgIrLw"  alt="login" className="w-full h-full"/>
        </div>  */}
       <div className="min-w-[500px]">
        <FormService />
       </div>
      </div>
    </div>  
    </main>  
  )
}