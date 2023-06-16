"use client"
import { Typography } from "@material-tailwind/react"
import SideBarDashbord from "./sideBarDashbord"
import { GrafigComparativo } from "./grafigComparativo"

export function MainAnlisar({ data }:any) {
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Analisar
      </Typography>
      <div className="min-w-full mt-6 p-4">
      <div className="min-w-full mt-6 p-4">
          <GrafigComparativo type="day" data={data} />
          <GrafigComparativo type="week" data={data} />
          <GrafigComparativo type="fortnight" data={data} />
          <GrafigComparativo type="month" data={data} />
      </div>
      </div>
    </div>  
   </main>    
  )
}