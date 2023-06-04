export async function filterProcductSales(procducts:any,sales:any) {

  const data = procducts.map((procduct:any) => {
    const id = procduct.id
    return sales.map((sale:any) => {
      return id == sale.id_product && {
        procduct,
        sale,
      }
    })
  })

  return data.filter((sale:any) => {
    return sale !== false
  })
}