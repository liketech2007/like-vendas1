"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { Grafig } from "./grafig";

export function MainDashboard() {
  return (
    <main className="min-w-full flex">
    <div className="hidden lg:block max-w-[20%]">
      <SideBarDashbord />
    </div>
    <div className="min-w-full lg:min-w-[80%] p-4">
      <Typography variant="h1">
        Dashboard
      </Typography>

      <div className="min-w-full mt-6 p-4">
        <Grafig type="day" data={[
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
    </main>
  )
}