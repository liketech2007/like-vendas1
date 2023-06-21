"use client"
import { Typography,Radio, Card, Input, Button } from "@material-tailwind/react"
import { Bar,Pie,Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useState } from "react";
import { filterData } from "@/filteres/filterData";
import { filterGrafig } from "@/filteres/filtergrafig";
import { filterDataGrafig2 } from "@/filteres/filterDataGrafig2";
import { filterDataTable } from "@/filteres/filterDataTable";
import { formDate } from "@/utils/formDate";
Chart.register(...registerables);


export function GrafigComparativo({ type,data }: any) {
  const dateNow = new Date();
  const dateNow2 = new Date()
  const numberDate = type === "day"? 1 : type === "week"? 7 : type === "fortnight"? 15 : type === "month"? 30 : 0
  dateNow2.setDate(dateNow2.getDate() - numberDate);
  const [date, setDate] = useState(`${dateNow}`)
  const [date1, setDate1] = useState(`${dateNow2}`)
  const dataNow = filterData(data,type,date);
  const dataNow2 = filterData(data,type,date1);
  const dataGrafig1 = filterGrafig(dataNow)
  const dataGrafig2 = filterDataGrafig2(dataGrafig1,date)
  const dataGrafigSecond1 = filterGrafig(dataNow2)
  const dataGrafigSecond2 = filterDataGrafig2(dataGrafigSecond1,date1)

  const quatDay = type === "day"? 0 : type === "week"? 7 : type === "fortnight"? 15 : type === "month"? 30 : 0
  const dataTable1 = filterDataTable(dataNow)
  const dateForm1 = formDate(`${date}`)
  const date3 = new Date(date)
  date3.setDate(date3.getDate() - quatDay)
  const dateForm3 = formDate(`${date3}`)
  dataTable1.unshift(`${dateForm3} / ${dateForm1}`)

  const dataTable2 = filterDataTable(dataNow2)
  const dateForm2 = formDate(`${date1}`)
  const date4 = new Date(date1)
  date4.setDate(date4.getDate() - quatDay)
  const dateForm4 = formDate(`${date4}`)
  console.log()
 
  dataTable2.unshift(`${dateForm4} / ${dateForm2}`)

  const dataGrafig = [
    dataGrafig2,
    dataGrafigSecond2
  ]

  const labels = dataGrafig.map((item:any) => item.label);
  const values = dataGrafig.map((item:any) => item.value);
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");

  const tableHeard = [`${type === "day"? "dias" : type === "week"? "Semanas" : type === "fortnight"? "Últimos 15 dias" : type === "month"? "Mêses" : null}`,"N.P.V","N.A.P","Total vendido","Custos","Lucro"]

  const dataChart = {
    labels,
    datasets: [
      {
        label: "Valor de vendas",
        data: values,
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
        max: Math.max(...values) + 10,
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
        <Input label="início" type="date" onChange={(e:any) => setDate(e.target.value)}/>
        <div>para</div>
        <Input label="início" type="date" onChange={(e:any) => setDate1(e.target.value)}/>
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
        <tr>
        {dataTable1.map((item, index) => (
              <td key={index} className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item}
                </Typography>
              </td>
        ))}
        </tr>
        <tr>
        {dataTable2.map((item, index) => (
              <td key={index} className="px-2 py-4 text-xs">
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {item}
                </Typography>
              </td>
        ))}
        </tr>
        </tbody>
      </table>
    </Card>
      </div>
    </div>
    </>
  )
}