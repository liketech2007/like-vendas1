export function filterGrafig(data:any) {
    const res = data.map((item:any) => {
        return {
            label: item.name,
            value: item.sales.length > 0 ? item.sales.reduce((aculamador:any,acount:any) => {
                const total = acount.price_sold * acount.quantity_sold
                return aculamador + total;
            },0) : 0
        }
    })

    return res;
}