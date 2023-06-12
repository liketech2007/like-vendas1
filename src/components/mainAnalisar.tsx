"use client"
import { Typography } from "@material-tailwind/react"
import SideBarDashbord from "./sideBarDashbord"
import { GrafigComparativo } from "./grafigComparativo"

export function MainAnlisar() {
 
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Analisar
      </Typography>
      <div className="min-w-full mt-6 p-4">
      <div className="min-w-full mt-6 p-4">
      <GrafigComparativo type="day" label="Valor de Vendas" data={[
          {
            label: "10-06-2023",
            value: 12,
          },{
            label: "11-06-2023",
            value: 16,
          }]} />
          <GrafigComparativo type="week" label="Valor de Vendas" data={[
          {
            label: "10-06-2023",
            value: 12,
          },{
            label: "11-06-2023",
            value: 16,
          }]} />
          <GrafigComparativo type="fortnight" label="Valor de Vendas" data={[
          {
            label: "10-06-2023",
            value: 12,
          },{
            label: "11-06-2023",
            value: 16,
          }]} />
          <GrafigComparativo type="month" label="Valor de Vendas" data={[
          {
            label: "10-06-2023",
            value: 12,
          },{
            label: "11-06-2023",
            value: 16,
          }]} />
      </div>
      </div>
    </div>  
   </main>    
  )
}