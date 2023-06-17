import { formDate } from "@/utils/formDate";

export function filterGrafigFunctionary(data:any,isSales:any) {
    //created_at
    const res:any = []

    data.forEach((item:any) => {
        if(isSales === true) {
            return item.sales.map((item1:any) => {
                const date = formDate(item1.created_at)
                res.push({
                    label: date,
                    value: item1.price_sold * item1.quantity_sold
                })
            }) 
         }else {
            return item.addition.map((item1:any) => {
                const date = formDate(item1.created_at)
                res.push({
                    label: date,
                    value: item1.purchase_price * item1.quantity_added
                })
            })
         }
    })
    return res
}