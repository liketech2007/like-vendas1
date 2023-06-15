export function filterData(data:any,type:string) {
const date = new Date()

  if(type === 'day') {
    const today = new Date().toISOString().split('T')[0];
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
  const productsWeek = data.filter((product:any) => {
    return (
      product.sales.some((sale:any) => new Date(sale.created_at).toISOString().split('T')[0] >= oneWeekAgo) ||
      product.addition.some((addition:any) =>new Date(addition.created_at).toISOString().split('T')[0] >= oneWeekAgo)
     );
  });

  return productsWeek;
  }

  if(type === "fortnight") {
    const fifteenDaysAgo = new Date(date.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const productsFitteenDays = data.filter((product:any) => {
    return (
      product.sales.some((sale:any) => new Date(sale.created_at).toISOString().split('T')[0] >= fifteenDaysAgo) ||
      product.addition.some((addition:any) =>new Date(addition.created_at).toISOString().split('T')[0] >= fifteenDaysAgo)
     );
  });

  return productsFitteenDays;
  }
  if(type === "month"){
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];

  const productsMonth = data.filter((product:any) => {
    return (
      product.sales.some((sale:any) => new Date(sale.created_at).toISOString().split('T')[0] >= startOfMonth) ||
      product.addition.some((addition:any) =>new Date(addition.created_at).toISOString().split('T')[0] >= startOfMonth)
     );
  });
  return productsMonth
  }
}