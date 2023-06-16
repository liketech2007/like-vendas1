export function filterData(data:any,type:string,dateNow:any) {
const date = new Date(dateNow)

  if(type === 'day') {
    const today = date.toISOString().split('T')[0];
    const productsToday = data.filter((product:any) => {
        return (
          product.sales.some((sale:any) => sale.created_at.includes(today)) ||
          product.addition.some((addition:any) => addition.created_at.includes(today))
        );
      });
      return productsToday;
  }
  
  
  if(type === "week") {
    const oneWeekAgo = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const oneWeekAgo1 = date.toISOString().split('T')[0];
  const productsWeek = data.filter((product:any) => {
    return (
      product.sales.some((sale:any) => new Date(sale.created_at).toISOString().split('T')[0] >= oneWeekAgo && new Date(sale.created_at).toISOString().split('T')[0] <= oneWeekAgo1) ||
      product.addition.some((addition:any) =>new Date(addition.created_at).toISOString().split('T')[0] >= oneWeekAgo && new Date(addition.created_at).toISOString().split('T')[0] <= oneWeekAgo1)
     );
  });

  return productsWeek;
  }

  if(type === "fortnight") {
    const fifteenDaysAgo = new Date(date.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const fifteenDaysAgo1 = date.toISOString().split('T')[0];

  const productsFitteenDays = data.filter((product:any) => {
    return (
      product.sales.some((sale:any) => new Date(sale.created_at).toISOString().split('T')[0] >= fifteenDaysAgo && new Date(sale.created_at).toISOString().split('T')[0] <= fifteenDaysAgo1) ||
      product.addition.some((addition:any) =>new Date(addition.created_at).toISOString().split('T')[0] >= fifteenDaysAgo && new Date(addition.created_at).toISOString().split('T')[0] <= fifteenDaysAgo1)
     );
  });

  return productsFitteenDays;
  }
  if(type === "month"){
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    const startOfMonth1 = date.toISOString().split('T')[0];

  const productsMonth = data.filter((product:any) => {
    return (
      product.sales.some((sale:any) => new Date(sale.created_at).toISOString().split('T')[0] >= startOfMonth && new Date(sale.created_at).toISOString().split('T')[0] <= startOfMonth1) ||
      product.addition.some((addition:any) =>new Date(addition.created_at).toISOString().split('T')[0] >= startOfMonth && new Date(addition.created_at).toISOString().split('T')[0] <= startOfMonth1)
     );
  });
  return productsMonth
  }
}