"use client"
import { Radio, Typography,Input,Card, Button  } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import Table from "./table";
import { Bar, Line, Pie } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { Chart, registerables } from 'chart.js';
import { useIdAuth } from "@/hooks/useIdAuth";
import { useRouter } from "next/navigation";
import { filterData } from "@/filteres/filterData";
import { filterGrafig } from "@/filteres/filtergrafig";
import { filterDataTable } from "@/filteres/filterDataTable";
import { filterProduct } from "@/filteres/filterProduct";
Chart.register(...registerables);


export function MainRelatorio({type,data}:any) {
  const dateNow = new Date();
  const [date, setDate] = useState(`${dateNow}`)
  const dataNow = filterData(data,type,date);
  const [data1,setData1] = useState(dataNow)
  useEffect(() => {
    const dataNow = filterData(data,type,date);
    setData1(dataNow)
  }, [date,data,type])

  const dataGrafig = filterGrafig(data1);
  const tableRows1 = filterDataTable(data1)
  const dataTable = filterProduct(dataNow)
  dataTable.sort((a:any, b:any) => b.nvp - a.nvp);


  const id_auth = useIdAuth()
  const router = useRouter()

  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
  const tableHeard = ["Nome","Preço","Quantidade","N.P.V","N.A.P","Total Vendido","Custos","Lucro"]

  const dataChart = {
    labels: dataGrafig.map((item:any) => item.label),
    datasets: [
      {
        label: "Valor de Vendas",
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
    <Typography variant="h1">
        Ralatório
      </Typography>

      <div className="min-w-full mt-6 p-4">
        <div className="w-full flex justify-end gap-4">
          <div className="my-4 max-w-[200px]">
          <Input label="início" type="date" onChange={(e:any) => setDate(e.target.value)}/>
          </div>
        </div>
      <div className="my-2">
        {
        <Table tableHeard={["N.P.V","N.A.P","Total vendido","Custos","Lucro"]} 
          tableRows={tableRows1}
        />
        }
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
          {dataTable.map((item:any, index:any) => (
            <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-blue-500 hover:text-white" onClick={() => {
              router.push(`/users/store/${id_auth}/product/${item.id}`)
            }}>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.name}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.price}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.quantity}
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
                  {item.total}
                </Typography>
              </td>
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  {item.custos}
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
    </main>
  )
}