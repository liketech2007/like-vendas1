export async function ilterSalesToday(sales:any,date:any) {
  const newdate = new Date(date)
  const data = sales.filter((sale:any) => {
    const dateAddition = new Date(sale.created_at)
    return dateAddition.getDate() === newdate.getDate() 
  })

  return data
}