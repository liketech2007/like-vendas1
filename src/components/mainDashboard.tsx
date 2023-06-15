"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { Grafig } from "./grafig";
import { filterData } from "@/filteres/filterData";
import { filterGrafig } from "@/filteres/filtergrafig";
import { filterDataTable } from "@/filteres/filterDataTable";

export function MainDashboard({ data }:any) {
  const dataHoje = filterData(data,"day");
  const dataGrafigHoje = filterGrafig(dataHoje)
  const dataWeek = filterData(data,"week");
  const dataGrafigWeek = filterGrafig(dataWeek)
  const dataFortnight = filterData(data,"fortnight");
  const dataGrafigFortnight = filterGrafig(dataFortnight)
  const dataMonth = filterData(data,"month");
  const dataGrafigMonth = filterGrafig(dataMonth)
  const tableRowsHoje = filterDataTable(dataHoje)
  const tableRowsWeek = filterDataTable(dataWeek)
  const tableRowsFortnight = filterDataTable(dataFortnight)
  const tableRowsMonth = filterDataTable(dataMonth)
  return (
    <main className="p-4 min-w-full  flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
      <Typography variant="h1">
        Dashboard
      </Typography>

      <div className="min-w-full mt-6 p-4">
        <Grafig type="day" label="Valor de Vendas" data={dataGrafigHoje} tableRows={tableRowsHoje}/>
      </div>
      <div className="min-w-full mt-6 p-4">
        <Grafig type="week" label="Valor de Vendas" data={dataGrafigWeek} tableRows={tableRowsWeek}/>
        <div className="min-w-full mt-6 p-4">
        <Grafig type="fortnight" label="Valor de Vendas" data={dataGrafigFortnight} tableRows={tableRowsFortnight}/>
      </div>
      <div className="min-w-full mt-6 p-4">
        <Grafig type="month" label="Valor de Vendas" data={dataGrafigMonth} tableRows={tableRowsMonth}/>
      </div>
      </div>
    </div>
    </main>
  )
}