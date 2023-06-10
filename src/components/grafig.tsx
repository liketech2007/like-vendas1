"use client"
import { Button, Typography } from "@material-tailwind/react"
import Link from "next/link"
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface IGrafig {
  type: "day"  | "week" | "fortnight" | "month" 
  data: {
      label: string,
      value: number
    }[]
}

export function Grafig({ type,data}: IGrafig) {
  const produtos = data.map((item:any) => item.label);
  const quantidades = data.map((item:any) => item.value);;

  const dataChart = {
    labels: produtos,
    datasets: [
      {
        label: 'Vendas',
        data: quantidades,
        backgroundColor: ['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.9)'],
        borderColor: ['rgba(33, 150, 243, 0.1)', 'rgba(33, 150, 243, 0.9)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: Math.max(...quantidades),
      },
    },
  };
  
  return (
    <>
      <div className="p-4">
      <div className="min-w-full flex gap-4 flex-wrap justify-between items-center">
      <Typography variant="h4">
        {type === "day"? "Hoje" : type === "week"? "Semana" : type === "fortnight"? "Últimos 15 dias" : type === "month"? "Mês" : null}
      </Typography>
      <div className="flex flex-col bg-blue-500 p-4 rounded-lg text-white">
      <Typography variant="small"><span className="font-bold">Número de produtos vendidos: </span>12</Typography>
      <Typography varient="small"><span className="font-bold">Número de adição de produtos: </span>1</Typography>
        <Typography variant="small"><span className="font-bold">Total vendido: </span>12.496KZ</Typography>
        <Typography variant="small"><span className="font-bold">Total custos: </span>10.496KZ</Typography>
        <Typography variant="small"><span className="font-bold">Lucro: </span>2.000KZ</Typography>
      </div>
      </div>
      <div className="my-4 max-h-[600px]">
      <Bar data={dataChart} options={options} />
      </div>
      <div className="min-w-full flex justify-end">
        <Link href="#">
          <Button>Ver mais</Button>
        </Link>
      </div>
    </div>
    </>
  )
}