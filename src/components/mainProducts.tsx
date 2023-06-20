"use client"
import { Button, Card, Input, Typography } from "@material-tailwind/react"
import SideBarDashbord from "./sideBarDashbord"
import { useRouter } from "next/navigation"
import { useIdAuth } from "../hooks/useIdAuth"
import Link from "next/link"
import { filterProduct } from "@/filteres/filterProduct"
import { useState } from "react"
import { search } from "@/filteres/search"

export function MainProducts({ data }:any) {
  const dataTable = filterProduct(data)
  dataTable.sort((a:any, b:any) => b.nvp - a.nvp);
  const [dataSearch, setDataSearch] = useState<any>()
  const type = "day"
  const tableHeard = ["Nome","Preço","Quantidade","N.P.V","N.A.P","Total Vendido","Custos","Lucro"]

  const router = useRouter()
  const id_auth = useIdAuth()

  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex flex-wrap bgap-6 justify-center itemes-center flex-col">
    <Typography variant="h1">
        Produtos
      </Typography>
      

      <div className="flex flex-col items-center justify-center">
        <div className="min-w-full lg:min-w-[70%] flex justify-center items-center gap-2 my-6">
          <Input type="search" label="Nome do produto" onChange={(e) => {
            const res = search(dataTable,`${e.target.value}`)
            setDataSearch(res)
          }} />
          <Button>Pesquisar</Button>
        </div>
        {
          dataSearch && (
      <Card className="overflow-scroll min-w-full flex jusify-center my-8">
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
          {dataSearch.map((item:any, index:any) => {
            return (
              <tr key={index} className="even:bg-blue-gray-50/50 hover:bg-blue-500 hover:text-white" onClick={() => {
                router.push(`/users/store/${id_auth}/product/${item.item.id}`)
              }}>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.name}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.price}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.quantity}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.nvp}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.nap}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.total}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.custos}
                  </Typography>
                </td>
                <td  className="px-2 py-4 text-xs">
                  <Typography variant="small"  className="font-normal">
                    {item.item.lucro}
                  </Typography>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Card>
          )
        }
        <div className="my-6  min-w-[90%] max-w-[90%] flex justify-center items-center">
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
     </div> 
     <div className="fixed bottom-5 right-5">
        <div className="max-w-[200px]">
          <Button>
            <Link href={`/users/store/${id_auth}/createProduct`}>
              Criar
            </Link>
          </Button>
        </div>
      </div>
  </main>    
  )
}