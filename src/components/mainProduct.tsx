"use client"
import { Button, Card, IconButton, Input, Radio, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography,Tooltip } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import Table from "./table";
import { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { FolderSimplePlus, PencilSimple, ShoppingCartSimple } from "@phosphor-icons/react";
import {
  Dialog,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { EditorChiefEFunctionary } from "./editorChiefEFunctionary";
import { EditorProduct } from "./editorProduct";
Chart.register(...registerables);

export function MainProduct() {
  
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
  const [typeData, setTypeData] = useState<"day"  | "week" | "fortnight" | "month">("day")
  const [openDiolag, setOpenDiolag] = useState<"sale" | "addition"  | false>(false)
  const [open, setOpen] = useState(false)
  const [isSale, setIsale] = useState<boolean>(true)
  const [openEditor, setOpenEditor] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen((cur) => !cur);
    setOpenDiolag(false);
  }

  const tableHeard = ["N.P.V","N.A.P","Total vendido","Custos","Lucro"]
  const tableRows = [{
    nvp: "12",
    nap: "1",
    totalVendido: "12.393kz",
    custo: "1000kz",
    lucro: "11.393kz"
  },{
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
        label: `${isSale === true ? "Valor de vendas" : "Valor de Adições"}`,
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
    <div className="min-w-full flex justify-end mb-6">
        <PencilSimple size={32} className="hover:text-blue-500 transition-all" onClick={() => setOpenEditor(true)}/>
    </div>
    <div>
    {
          openEditor && (
            <>
                <EditorProduct value={
                {
                  name: "oscar",
                  price: 1000,
                  quantity: 10,
                  category: "oscar",
                  minimum_stock_level: 1,
                  description: "jskjh"
                }
                } />
                  <div className="w-full flex justify-center items-center mt-4">
                  <Button  className="bg-transparent text-black mt-4" onClick={() => setOpenEditor(false)}>
                      fechar
                  </Button>
                  </div>
            </>
          )
        }
    </div>
    <div className="flex gap-2 justify-between flex-wrap">
    <div className="flex flex-col gap-3">
    <Typography variant="h1">
        Product 1
      </Typography>
      <div><span className="">Preço:</span> 1.200</div>
      <div><span className="">Quantidade:</span> 12</div>
      <div><span className="">Valor minímo de stock:</span> 1</div>
      <div><span className="">Categoria:</span> peixes</div>
      <div><span className="">Descrição:</span> Caixa de paixe</div>
    </div>
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
        ]}/>
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
        <Input label="início" type={`${typeData == "day" || typeData === "fortnight" ? "date" : typeData == "week" ? 'week' : typeData === "month" ? "month" : null}`}/>
        <Button>Gerar</Button>
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
          {tableRows.map((item, index) => (
            <tr  key={index} className="even:bg-blue-gray-50/50">
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

    <div>
    <>
      {
        openDiolag === "sale" ? (
          <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center"
        >
          <Card className="min-w-[80%] lg:min-w-[24rem] max-w-[80%] lg:max-w-[24rem]">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white" className="text-center">
                Adicionar Venda
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input label="Preço" />
              <Input label="Quantidade"  />
              
            </CardBody>
            <CardFooter className="pt-0 flex gap-3 justify-center items-start">
            <Button onClick={handleOpen} className="bg-transparent text-black" >
                Cancelar
              </Button>
              <Button variant="gradient" onClick={handleOpen}>
                Adicionar
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
        ) : openDiolag === "addition" ? (
          <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none min-w-full lg:min-w-[24rem] flex justify-center items-center"
        >
          <Card className="min-w-[80%] lg:min-w-[24rem] max-w-[80%] lg:max-w-[24rem]">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white" className="text-center">
                Adicionar Produto
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input label="Valor de aquisição"  />
              <Input label="Quantidade"  />
            </CardBody>
            <CardFooter className="pt-0 flex gap-3 justify-center items-start">
            <Button onClick={handleOpen} className="bg-transparent text-black" >
                Cancelar
              </Button>
              <Button variant="gradient">
                Adicionar
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
        ) : null
      }
    </>
    </div>



    <div className="relative w-full h-80">
      <div className="fixed bottom-5 right-5">
      <SpeedDial>
        <SpeedDialHandler>
          <IconButton size="lg" className="rounded-full text-3xl hover:transition-transform hover:rotate-45">
            +
          </IconButton>
        </SpeedDialHandler>
        <SpeedDialContent>
          <SpeedDialAction>
          <Tooltip content="Vendas de produto">
            <Button onClick={() => {
              setOpenDiolag("sale")
              setOpen(true);
            }}>
              <ShoppingCartSimple size={32} />
            </Button>
          </Tooltip>
          </SpeedDialAction>
          <SpeedDialAction>
          <Tooltip content="Adição de produto">
            <Button onClick={() => {
              setOpenDiolag("addition")
              setOpen(true);
            }}>
            <FolderSimplePlus size={32} />
            </Button>
          </Tooltip>
          </SpeedDialAction>
        </SpeedDialContent>
      </SpeedDial>
      </div>
    </div>
    </div>  
    </main>  
  )
}