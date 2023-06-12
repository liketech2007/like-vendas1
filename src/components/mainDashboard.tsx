"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { Grafig } from "./grafig";

export function MainDashboard() {
  return (
    <main className="flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
      <Typography variant="h1">
        Dashboard
      </Typography>

      <div className="min-w-full mt-6 p-4">
        <Grafig type="day" label="Valor de Vendas" data={[
          {
            label: "arroz",
            value: 10,
          },{
            label: "feijão",
            value: 18,
          },{
            label: "fuba",
            value: 15,
          }
        ]}/>
      </div>
      <div className="min-w-full mt-6 p-4">
        <Grafig type="week" label="Valor de Vendas" data={[
          {
            label: "arroz",
            value: 10,
          },{
            label: "feijão",
            value: 18,
          },{
            label: "fuba",
            value: 15,
          },
        ]}/>
        <div className="min-w-full mt-6 p-4">
        <Grafig type="fortnight" label="Valor de Vendas" data={[
          {
            label: "arroz",
            value: 10,
          },{
            label: "feijão",
            value: 18,
          },{
            label: "fuba",
            value: 15,
          },
        ]}/>
      </div>
      <div className="min-w-full mt-6 p-4">
        <Grafig type="month" label="Valor de Vendas" data={[
          {
            label: "arroz",
            value: 10,
          },{
            label: "feijão",
            value: 18,
          },{
            label: "fuba",
            value: 15,
          },
        ]}/>
      </div>
      </div>
    </div>
    </main>
  )
}