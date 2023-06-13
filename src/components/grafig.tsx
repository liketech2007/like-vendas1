"use client"
import { Button, Typography,Radio } from "@material-tailwind/react"
import Link from "next/link"
import { Bar,Pie,Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import Table from "./table";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useIdAuth } from "@/hooks/useIdAuth";
Chart.register(...registerables);

interface IGrafig {
  type: "day"  | "week" | "fortnight" | "month" 
  data: {
      label: string,
      value: number
    }[]
    label: string,
}

export function Grafig({ type,data,label}: IGrafig) {
  const router = useRouter()
  const produtos = data.map((item:any) => item.label);
  const quantidades = data.map((item:any) => item.value);
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
  const id_auth = useIdAuth();

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
        {type === "day"? "Hoje" : type === "week"? "Semana" : type === "fortnight"? "Últimos 15 dias" : type === "month"? "Mês" : null}
      </Typography>
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
      <div className="min-w-full flex justify-end">
          <Button>
            <Link href={`/users/store/${id_auth}/relatorio?type=${type}`}>
              Ver mais
            </Link>
          </Button>
      </div>
    </div>
    </>
  )
}