"use client"
import { Typography,Radio, Card, Input, Button } from "@material-tailwind/react"
import { Bar,Pie,Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useState } from "react";
Chart.register(...registerables);

interface IGrafig {
  type: "day"  | "week" | "fortnight" | "month" 
  data: {
      label: string,
      value: number
    }[]
    label: string,
}

export function GrafigComparativo({ type,data,label}: IGrafig) {
  const produtos = data.map((item:any) => item.label);
  const quantidades = data.map((item:any) => item.value);
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
  const dataChart = {
    labels: produtos,
    datasets: [
      {
        label,
        data: quantidades,
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
        max: Math.max(...quantidades) + 10,
      },
    },
  };
  
  return (
    <>
      <div className="p-4">
      <div className="min-w-full flex gap-4 flex-col lg:flex-row lg:justify-between items-center">
      <Typography variant="h4">
        {type === "day"? "Comparação diária" : type === "week"? "Comparação semanal" : type === "fortnight"? "Comparação dos últimos 15 dias" : type === "month"? "Comaparação Mensal" : null}
      </Typography>
      <div className="my-2">
        
      </div>
      </div>
      <div className="min-w-full flex gap-2 flex-wrap justify-end items-center mb-6">
        <div className="max-w-[200px] flex flex-wrap gap-2">
        <div>Data:</div>
        <Input label="início" type={`${type == "day" || type === "fortnight" ? "date" : type == "week" ? 'week' : type === "month" ? "month" : null}`}/>
        <div>para</div>
        <Input label="início" type={`${type == "day" || type === "fortnight" ? "date" : type == "week" ? 'week' : type === "month" ? "month" : null}`}/>
        <div className="m-4">
        <Button>Gerar</Button>
        </div>
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
      <div className="">
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
    </>
  )
}