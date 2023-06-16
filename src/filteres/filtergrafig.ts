export function filterGrafig(data:any,isSales:boolean = true) {
    const res = data.map((item:any) => {
        return {
            label: item.name,
            value: isSales === true ? item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => {
                const total = acount.price_sold * acount.quantity_sold
                return aculamador + total;
            },0) : 0 : item.addition.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => {
                const total = acount.purchase_price * acount.quantity_added
                return aculamador + total;
            },0) : 0
        }
    })

    return res;
}