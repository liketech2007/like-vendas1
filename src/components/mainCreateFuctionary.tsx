"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { FormSecond } from "./formSecond";

export function MainCreateFunctionary() {
  return (
    <main className="min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1" className="p-2 rounded-lg bg-blue-500 text-white max-w-[400px] text-center">
        Funcionário
      </Typography>

      <div className="min-w-full flex flex-col justify-center items-center min-h-[50vh] gap-4 lg:flex-row mt-8">
        {/* <div className="max-w-[300px]">
          <img src="https://media.graphassets.com/Ad3UMdXLQkuZqMdgIrLw"  alt="login" className="w-full h-full"/>
        </div>  */}
       <div className="min-w-full lg:min-w-[500px]">
       <FormSecond type="functionary" /> 
       </div>
      </div>
    </div>  
    </main>  
  )
}