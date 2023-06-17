import { formDate } from "@/utils/formDate";

export function filterDataSalesAddition(data:any,isSale:boolean = true) {
    const res:any = []
    data.forEach((item:any) => {
        if(isSale === true) {
            return item.sales.map((item:any) => { 
                const date = formDate(item.created_at);
                res.push({
                    date,
                    price: item.price_sold,
                    quat: item.quantity_sold,
                    total: item.price_sold * item.quantity_sold,
                    id_product: item.id_product,
                })
            })
        }else {
            return  item.addition.map((item:any) => { 
                const date = formDate(item.created_at);
                res.push({
                    date,
                    price: item.purchase_price,
                    quat: item.quantity_added,
                    total: item.purchase_price * item.quantity_added,
                    id_product: item.id_product,
                })
            })
        }
    })

    return res
}