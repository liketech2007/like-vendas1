"use client"
import { Button, Card, Input, Radio, Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { useEffect, useState } from "react";
import Table from "./table";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useIdAuth } from "@/hooks/useIdAuth";
import { useRouter } from "next/navigation";
import { PencilSimple } from "@phosphor-icons/react";
import { EditorChiefEFunctionary } from "./editorChiefEFunctionary";
import { filterData } from "@/filteres/filterData";
import { filterGrafig } from "@/filteres/filtergrafig";
import { filterGrafigFunctionary } from "@/filteres/filterGrafigFunctionary";
import { filterDataTable } from "@/filteres/filterDataTable";
import { filterDataSalesAddition } from "@/filteres/filterDataSalesAddition";
import { Delete } from "./delete";
Chart.register(...registerables);

export function MainFunctionary({ dataFunctionary }:any) {
  const id_auth = useIdAuth()
  const router = useRouter()
  const dateNew = new Date()
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
  const [typeData, setTypeData] = useState<"day"  | "week" | "fortnight" | "month">("day")
  const [isSale, setIsale] = useState<boolean>(true)
  const [openEditor, setOpenEditor] = useState<boolean>(false)
  const [date,setDate] =useState(`${dateNew}`)
  const dataNow = filterData(dataFunctionary,typeData,date)
  const res = filterGrafigFunctionary(dataNow,isSale)
  const [dataGrafig,setDataGrafig] = useState(res)
  const tableRowsT = filterDataTable(dataNow)
  useEffect(() => {
    const dataNow = filterData(dataFunctionary,typeData,date)
    const res = filterGrafigFunctionary(dataNow,isSale)
    setDataGrafig(res)

  },[date,dataFunctionary,isSale,typeData])


 const dataTable = filterDataSalesAddition(dataNow,isSale)
 dataTable.sort((a:any, b:any) => b.date - a.date);
  const tableHeardSales = ["data","preço","quantidade","total vendido"]
  const tableHeardAdiition = ["data","valor de aquisição","quantidade", "total de custo"]
  const tableHeard = isSale === true ? tableHeardSales : tableHeardAdiition


  const dataChart = {
    labels: dataGrafig.map((item:any) => item.label),
    datasets: [
      {
        label: `${isSale === true ? "Valor de vendas" : "Valor de Adições"}`,
        data: dataGrafig.map((item:any) => item.value),
        backgroundColor: ['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.5)','rgba(33, 150, 243, 0.9)'],
        borderColor: ['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.5)','rgba(33, 150, 243, 0.9)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...dataGrafig.map((item:any) => item.value)) + 10,
      },
    },
  };
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <div className="min-w-full flex justify-between mb-6">
        <Delete id={dataFunctionary[0].id} type="functionary"/>
        <PencilSimple size={32} className="hover:text-blue-500 transition-all" onClick={() => setOpenEditor(!openEditor)}/>
    </div>
    <div>
    {
          openEditor && (
            <>
                <EditorChiefEFunctionary type="functionary" id={dataFunctionary[0].id} value={dataFunctionary[0].name} />
            </>
          )
        }
    </div>
    <div className="flex gap-2 justify-between flex-wrap">
    <div className="flex flex-col gap-3">
    <Typography variant="h1">
        {dataFunctionary[0].name}
      </Typography>
      <div><span className="">Email:</span> {dataFunctionary[0].email}</div>
    </div>
      <Table tableHeard={["N.P.V","N.A.P","Total vendido","Custos","Lucro"]} 
          tableRows={tableRowsT}/>
    </div>
    <div className="min-w-full flex gap-2 justify-between flex-wrap mt-8">
    <div className="min-w-full flex gap-2 flex-wrap items-center">
        <div>Tipos de gráficos:</div>
        <Radio id="html" name="type" label="Barra" onClick={() => setTypeChart("Bar")}/>
        <Radio id="react" name="type" label="Pizza" onClick={() => setTypeChart("Pie")}/>
        <Radio id="html" name="type" label="Linha" onClick={() => setTypeChart("Line")}/>
      </div>
      <div className="min-w-full flex gap-2 flex-wrap items-center">
        <div>Tipos de dados:</div>
        <Radio id="html" name="type" label="Diário" onClick={() => setTypeData("day")}/>
        <Radio id="react" name="type" label="Semanal" onClick={() => setTypeData("week")}/>
        <Radio id="html" name="type" label="Últimos 15 dias" onClick={() => setTypeData("fortnight")}/>
        <Radio id="html" name="type" label="Mensal" onClick={() => setTypeData("month")}/>
      </div>
    </div>

    <div className="flex justify-between gap-2 flex-wrap">
    <div className="text-xl mt-10">
    {typeData === "day"? "Diário" : typeData === "week"? "Semanal" : typeData === "fortnight"? "Últimos 15 dias" : typeData === "month"? "Mensal" : null}
    </div>
    <div className="max-w-[200px] flex flex-wrap gap-2">
        <div>Data:</div>
        <Input label="início" type="date" onChange={(e) => setDate(`${e.target.value}`)}/>
      </div>  
    </div>

    <div className="flex justify-center items-center gap-2 mt-8">
    <Button className={`${isSale == true ? "" : "bg-transparent text-black"}`} onClick={() => setIsale(true)}>Vendas</Button>
    <Button className={`${isSale == false ? "" : "bg-transparent text-black"}`} onClick={() => setIsale(false)}>Adições</Button>
    </div>
    <div className="text-xl mt-10">
      {
        isSale == true ? "Vendas" : "Adições"
      }
    </div>

    <div className="mt-8 max-h-[600px]">
    {
        typeChart === "Bar"? (
                  <Bar data={dataChart} options={options} />
                ) : typeChart === "Pie"? (
                  <Pie data={dataChart} options={options} />
                ) : typeChart === "Line"? (
                  <Line data={dataChart} options={options} />
                ) : null
      }
    </div>

    <div className="mt-8">
    <Card className="overflow-scroll lg:overflow-none min-w-full flex jusify-center">
      <table className="text-center">
        <thead>
          <tr>
            {tableHeard.map((head) => (
              <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 px-2 py-4 text-xs">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataTable.map((item:any,index:any) => (
            <tr  key={index} className="even:bg-blue-gray-50/50 hover:bg-blue-500 hover:text-white" onClick={() => {
              router.push(`/users/store/${id_auth}/product/${item.id_product}`);
            }}>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" className="font-normal">
                  {item.date}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.price}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.quat}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.total }
                </Typography>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
    </Card>
    </div>
    </div>  
    </main>  
  )
}