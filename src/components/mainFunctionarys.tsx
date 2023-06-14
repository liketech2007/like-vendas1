"use client"
import { Button, Card, Input, Radio, Typography } from "@material-tailwind/react"
import SideBarDashbord from "./sideBarDashbord"
import { useRouter } from "next/navigation"
import { useIdAuth } from "../hooks/useIdAuth"
import Link from "next/link"
import { Bar,Pie,Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useState } from "react"
Chart.register(...registerables);

export function MainFunctionarys() {
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
  const [typeData, setTypeData] = useState<"day"  | "week" | "fortnight" | "month">("day")
  
  const data = [
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
  ]
  const dataChart = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: "Vendas dos Funcionários",
        data: data.map(item => item.value),
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
        max: Math.max(...data.map(item => item.value)) + 10,
      },
    },
  };

  const type = "day"
  const tableHeard = [`${type === "day"? "dias" : type === "week"? "Semanas" : type === "fortnight"? "Últimos 15 dias" : type === "month"? "Mêses" : null}`,"N.P.V","N.A.P","Total vendido","Custos","Lucro"]
  const tableRows = [{
    date:"10-06-2023",
    nvp: "12",
    nap: "1",
    totalVendido: "12.393kz",
    custo: "1000kz",
    lucro: "11.393kz"
  },{
    date:"11-06-2023",
    nvp: "16",
    nap: "6",
    totalVendido: "16.393kz",
    custo: "1000kz",
    lucro: "15.393kz"
  }]
  const router = useRouter()
  const id_auth = useIdAuth()
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex flex-wrap bgap-6 justify-center itemes-center flex-col">
    <Typography variant="h1">
        Funcionários
      </Typography>
      

      <div className="flex flex-col items-center justify-center">
        <div className="min-w-full lg:min-w-[70%] flex justify-center items-center gap-2 my-6">
          <Input type="search" label="Nome do funcionário" />
          <Button>Pesquisar</Button>
        </div>
        <div className="min-w-full my-8">

        <div className="min-w-full flex gap-2 flex-wrap justify-end items-center">
        <div>Tipos de gráficos:</div>
        <Radio id="html" name="type" label="Barra" onClick={() => setTypeChart("Bar")}/>
        <Radio id="react" name="type" label="Pizza" onClick={() => setTypeChart("Pie")}/>
        <Radio id="html" name="type" label="Linha" onClick={() => setTypeChart("Line")}/>
      </div>
      
        <div className="mt-8 max-h-[600px] flex justify-center items-center">
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
        </div>
        <div className="my-6 min-w-[90%] max-w-[90%] flex justify-center items-center">
        <Card className="overflow-scroll min-w-full flex jusify-center">
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
          {tableRows.map((item, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-blue-500 hover:text-white" onClick={() => {
              router.push(`/users/store/${id_auth}/functionary/oscar`)
            }}>
              
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.date}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.nvp}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.nap}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.totalVendido}
                </Typography>
              </td>
              <td  className="px-2 py4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.custo}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.lucro}
                </Typography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
        </div>
      </div>
     </div> 
     <div className="fixed bottom-5 right-5">
     <div className="max-w-[200px]">
          <Button>
            <Link href={`/users/store/${id_auth}/createFunctionary`}>
              Criar
            </Link>
          </Button>
        </div>
      </div>
  </main>    
  )
}