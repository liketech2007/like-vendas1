"use client"
import { Typography } from "@material-tailwind/react";
import SideBarDashbord from "./sideBarDashbord";
import { CardPost } from "./cardPost";
import { useIdAuth } from "@/hooks/useIdAuth";
import { formDate } from "@/utils/formDate";

export function MainFeed({ data }:any) {
  const dataFeed = data.filter((item:any) => {
    return item.sales.length > 0
  })
  dataFeed.sort((a:any, b:any) => {
    return a.sales.map((itema:any) => {
      return b.sales.map((itemb:any) => {
        return itemb.created_at - itema.created_at
      })
    })
  });
  const id_auth = useIdAuth()

  return (
    <main className="p-4 min-w-full flex justify-between">
    <div className="hidden lg:block">
      <SideBarDashbord />
    </div>
    <div className="min-w-full max-w-full lg:max-w-[80%] lg:min-w-[80%] p-4 flex justify-center itemes-center flex-col">
    <Typography variant="h1">
        Feed
      </Typography>
      <div className="w-[80%] my-4 flex flex-wrap gap-6">
        {
          dataFeed.map((item:any) => {
            return item.sales.map((sales:any) => {
              const date = formDate(`${sales.created_at}`)
              return (
                <CardPost key={item.id} namefunctionary={item.name} price={sales.price_sold} link={`/users/store/${id_auth}/product/${sales.id_product}`} date={date} quat={sales.quantity_sold}  />
              )
            })
          })
        }
      </div>
    </div>
   </main>
  )
}