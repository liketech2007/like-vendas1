"use client"
import { Radio, Typography,Input,Card, Button  } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import Table from "./table";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useState } from "react";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


export function MainRelatorio({type}:any) {
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
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
        label: "Valor de Vendas",
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
  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Ralatório
      </Typography>

      <div className="min-w-full mt-6 p-4">
        <div className="w-full flex justify-end gap-4">
          <div className="my-4 max-w-[200px]">
          <Input label="início" type={`${type == "day" || type === "fortnight" ? "date" : type == "week" ? 'week' : type === "month" ? "month" : null}`}/>
          <div className="mt-4">
          <Button>Gerar</Button>
          </div>
          </div>
        </div>
      <div className="my-2">
        <Table tableHeard={["N.P.V","N.A.P","Total vendido","Custos","Lucro"]} 
          tableRows={[
            {
              value: "12",
            },{
              value: "1",
            },{
              value: "12.798kz",
            },{
              value: "1.000kz",
            },{
              value: "11.798kz",
            },
        ]}
        />
      </div>
      </div>
      <div className="min-w-full flex gap-2 flex-wrap justify-end items-center">
        <div>Tipos de gráficos:</div>
        <Radio id="html" name="type" label="Barra" onClick={() => setTypeChart("Bar")}/>
        <Radio id="react" name="type" label="Pizza" onClick={() => setTypeChart("Pie")}/>
        <Radio id="html" name="type" label="Linha" onClick={() => setTypeChart("Line")}/>
      </div>
      <div className="my-4 max-h-[600px]">
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
      <div className="my-4">
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
          {tableRows.map((item, index) => (
            <tr key={index} className="even:bg-blue-gray-50/50">
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.date}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.nvp}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.nap}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.totalVendido}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item.custo}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
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
    </main>
  )
}