export function filterProduct(data:any) {
    return data.map((item:any) => {
        const total = item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => {
            const total = acount.price_sold * acount.quantity_sold
            return aculamador + total;
        },0) : 0
        const custos = item.addition.length > 0 ? item.addition.reduce((aculamador:any,acount:any) => {
            const total = acount.purchase_price * acount.quantity_added
            return aculamador + total;
        },0) : 0
        return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            nvp: item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => { 
                return aculamador + acount.quantity_sold;
            },0) : 0,
            nap: item.addition.length > 0 ? item.addition.reduce((aculamador:any,acount:any) => { 
                return aculamador + acount.quantity_added;
            },0) : 0,
            total,
            custos,
            lucro:  total - custos
        }
    })
}