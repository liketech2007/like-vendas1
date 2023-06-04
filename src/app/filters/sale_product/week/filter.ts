export async function filterSalesWeek(sales:any,days:number) {
  const newdate = new Date()
  newdate.setDate(newdate.getDate() - 7)
  const data = sales.filter((sale:any) => {
    const dateAddition = new Date(sale.created_at)
    return dateAddition >= newdate
  })

  return data
}