import { formDate } from "@/utils/formDate";

export function filterGrafigFunctionary(data:any,isSales:boolean = true) {
    //created_at
    const res = data.map((item:any) => {
         if(isSales === true) {
            return item.sales.map((item1:any) => {
                const date = formDate(item1.created_at)
                return {
                    label: date,
                    value: item1.price_sold * item1.quantity_sold
                }
            })
         }else {
            return item.addition.map((item1:any) => {
                const date = formDate(item1.created_at)
                return {
                    label: date,
                    value: item1.purchase_price * item1.quantity_added
                }
            })
         }
    })

    return res
}