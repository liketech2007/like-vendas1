"use client"
import { Button, Card, IconButton, Input, Radio, SpeedDial, SpeedDialAction, SpeedDialContent, SpeedDialHandler, Typography,Tooltip, Spinner, Alert } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import Table from "./table";
import { useEffect, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { FolderSimplePlus, PencilSimple, ShoppingCartSimple } from "@phosphor-icons/react";
import {
  Dialog,
  CardHeader,
} from "@material-tailwind/react";
import { EditorProduct } from "./editorProduct";
import { filterData } from "@/filteres/filterData";
import { filterGrafigFunctionary } from "@/filteres/filterGrafigFunctionary";
import { filterDataTable } from "@/filteres/filterDataTable";
import { filterDataSalesAddition } from "@/filteres/filterDataSalesAddition";
import { useIdAuth } from "@/hooks/useIdAuth";
import { useRouter } from "next/navigation";
import z from "zod"
import { useForm,SubmitHandler } from "react-hook-form";
import { useFunctionary } from "@/hooks/useFunctionary";
import { useUserLocalStorage } from "@/hooks/useUserLocalStorage";
import { actionSaleCreate } from "@/app/endpoints/sale_product/create/action";
import { actionAdditionCreate } from "@/app/endpoints/addition_product/create/action";
import { Delete } from "./delete";
import { updateQuatProduct } from "@/app/endpoints/product/updateQuat/action";
Chart.register(...registerables);

const schema = z.object({
  price: z.number(),
  quantity: z.number(),
})
type IFormInput = z.infer<typeof schema>;


export function MainProduct({ dataProduct,id_product }:any) {
  const { register, handleSubmit,formState: { errors } } = useForm<IFormInput>();
  const [loading,setLoading] = useState(false)

  const id_auth = useIdAuth()
  const router = useRouter()
  const user = useUserLocalStorage()
  const dateNew = new Date()
  const [date,setDate] =useState(`${dateNew}`)
  const [typeChart, setTypeChart] = useState<"Bar" | "Pie" | "Line">("Bar");
  const [typeData, setTypeData] = useState<"day" | "week" | "fortnight" | "month">("day")
  const [openDiolag, setOpenDiolag] = useState<"sale" | "addition"  | false>(false)
  const [open, setOpen] = useState(false)
  const [isSale, setIsale] = useState<boolean>(true)
  const [openEditor, setOpenEditor] = useState<boolean>(false)
  const dataNow = filterData(dataProduct,typeData,date)
  const res = filterGrafigFunctionary(dataNow,isSale)
  const [dataGrafig,setDataGrafig] = useState(res)
  const tableRowsT = filterDataTable(dataNow)
  const [error, setError] = useState("")
  const functLocal = useFunctionary()
  const [quat,setQuat] = useState(0)
  useEffect(() => {
    const dataNow = filterData(dataProduct,typeData,date)
    const res = filterGrafigFunctionary(dataNow,isSale)
    setDataGrafig(res)

  },[date,dataProduct,isSale,typeData])

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
     setLoading(true)
     const id_store = user !== undefined ? user.id : 0
     const {price,quantity} = data
     setQuat(quantity)
     const time_open = `${user?.time_open}`.slice(0, 2);
     const time_close = `${user?.time_close}`.slice(0, 2);
    
     if(dateNew.getHours() < Number(time_open) || dateNew.getHours() > Number(time_close)) {
      console.log("oi")
      setError("A loja está fechada")
      setLoading(false)
     } else {
      if(openDiolag === "sale") {
        if(dataProduct[0].quantity <= quantity) {
          setError("Não tem quantidade suficiente!")
          setLoading(false)
        } else {
          const dataAuxilar = {
            id_functionary: functLocal === undefined ? 0 : functLocal.id_functionary,
            id_store: functLocal === undefined ? Number(id_store) : functLocal.id_store, 
            id_product: Number(id_product),
            quantity_sold: quantity,
            price_sold: price,
           } 
          const res = await actionSaleCreate(dataAuxilar)
    
          if(typeof res !== "string") {
            if(res[0].id) {
              const quat = dataProduct[0].quantity - quantity
              await updateQuatProduct(dataProduct[0].id,quat)
              window.location.reload()
            } else {
              setError("Error Tente novamente")
              setLoading(false)
            }
          }else {
            setError("Error Tente novamente")
            setLoading(false)
          }
        }
        
       }else {
        const dataAuxilar = {
          id_functionary: functLocal === undefined ? 0 : functLocal.id_functionary,
          id_store: functLocal === undefined ? Number(id_store) : functLocal.id_store, 
          id_product: Number(id_product),
          quantity_added: quantity,
          purchase_price: price,
         } 
        const res = await actionAdditionCreate(dataAuxilar)
  
        if(typeof res !== "string") {
          if(res[0].id) {
            const quat = dataProduct[0].quantity + quantity
              await updateQuatProduct(dataProduct[0].id,quat)
            window.location.reload()
          } else {
            setError("Error Tente novamente")
            setLoading(false)
          }
        }else {
          setError("Error Tente novamente")
          setLoading(false)
        }
       }
     }
     setLoading(false)
  }

  const dataTable = filterDataSalesAddition(dataNow,isSale)
  dataTable.sort((a:any, b:any) => b.date - a.date);
    const tableHeardSales = ["data","preço","quantidade","total vendido","delete"]
    const tableHeardAdiition = ["data","valor de aquisição","quantidade", "total de custo","detele"]
    const tableHeard = isSale === true ? tableHeardSales : tableHeardAdiition

  const handleOpen = () => {
    setOpen((cur) => !cur);
    setOpenDiolag(false);
  }
 
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
        <Delete id={dataProduct[0].id} type="product"/>
        <PencilSimple size={32} className="hover:text-blue-500 transition-all" onClick={() => setOpenEditor(true)}/>
    </div>
    <div>
    {
          openEditor && (
            <>
                <EditorProduct value={
                {
                  id: dataProduct[0].id,
                  name: dataProduct[0].name,
                  price: dataProduct[0].price,
                  quantity: dataProduct[0].quantity,
                  category: dataProduct[0].category,
                  minimum_stock_level: dataProduct[0].minimum_stock_level,
                  description: dataProduct[0].description
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
        {dataProduct[0].name}
      </Typography>
      <div><span className="">Preço:</span> {dataProduct[0].price}</div>
      <div><span className="">Quantidade:</span> <span className={`${dataProduct[0].quantity <= dataProduct[0].minimum_stock_level && "text-red-500"}`}>{dataProduct[0].quantity}</span></div>
      <div><span className="">Valor minímo de stock:</span> {dataProduct[0].minimum_stock_level}</div>
      <div><span className="">Categoria:</span> {dataProduct[0].category}</div>
      <div><span className="">Descrição:</span> {dataProduct[0].description}</div>
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
        <Input label="início" type="date" onChange={(e) => setDate(e.target.value)}/>
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
            <tr  key={index} className="even:bg-blue-gray-50/50 hover:bg-blue-500 hover:text-white">
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
              <td  className="px-2 py-4 text-xs">
                <Typography variant="small"  className="font-normal">
                  <Delete id={item.id} type={isSale === true ? "sale" : "addition"} quat={isSale === true ? dataProduct[0].quantity + quat : dataProduct[0].quantity - quat}/>
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
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4">
              <Input label="Preço" {...register("price", { required: true })}/>
              <Input label="Quantidade" {...register("quantity", { required: true })} />
              
            </div>
            <div className="pt-0 flex gap-3 justify-center items-start p-4">
            <Button onClick={handleOpen} className="bg-transparent text-black" >
                Cancelar
              </Button>
              <Button type="submit" variant="gradient" className="flex gap-3" >
                Adicionar
                {
                  loading && <Spinner />
                }
              </Button>
            </div>
            <div className="my-3 p-4">
                    {
                  errors.quantity || errors.price ||  error ? <div className="">
                    <Alert color="red" variant="gradient">
                    <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
                  </Alert>
                  </div> : null
                }
              </div>
            </form>
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
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 p-4">
              <Input label="Valor de aquisição"  {...register("price", { required: true })} />
              <Input label="Quantidade" {...register("quantity", { required: true })}  />
            </div>
            <div className="pt-0 flex gap-3 justify-center items-start p-4">
            <Button  onClick={handleOpen} className="bg-transparent text-black" >
                Cancelar
              </Button>
              <Button type="submit" variant="gradient" className="flex gap-3">
                Adicionar
                {
                  loading && <Spinner />
                }
              </Button>
            </div>
            <div className="my-3 p-4">
                    {
                  errors.quantity || errors.price ||  error ? <div className="">
                    <Alert color="red" variant="gradient">
                    <span>{error.length == 0 ? "Preencha correctamento os campos acima para continuar." : error }</span>
                  </Alert>
                  </div> : null
                }
              </div>
            </form>
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