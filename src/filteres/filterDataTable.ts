export function filterDataTable(data:any) {
    const res = data.map((item:any) => {
        const npv = item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => { 
            return aculamador + acount.quantity_sold;
        },0) : 0
        const nap = item.addition.length > 0 ? item.addition.reduce((aculamador:any,acount:any) => { 
            return aculamador + acount.quantity_added;
        },0) : 0
        const total = item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => {
            const total = acount.price_sold * acount.quantity_sold
            return aculamador + total;
        },0) : 0
        const custos = item.addition.length > 0 ? item.addition.reduce((aculamador:any,acount:any) => {
            const total = acount.purchase_price * acount.quantity_added
            return aculamador + total;
        },0) : 0
       
        return {
            npv,
            nap,
            total,
            custos,
        }
    })

    const npv = res.reduce((aculamador:any,acount:any) => {
        return aculamador + acount.npv;
    },0)
    const nap = res.reduce((aculamador:any,acount:any) => {
        return aculamador + acount.nap;
    },0)
    const total = res.reduce((aculamador:any,acount:any) => {
        return aculamador + acount.total;
    },0)
    const custos = res.reduce((aculamador:any,acount:any) => {
        return aculamador + acount.custos;
    },0)
    const lucro = total - custos


    return [npv,nap,total,custos,lucro]
}