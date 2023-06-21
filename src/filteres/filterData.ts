export function filterData(data:any,type:string,dateNow:any) {
const date = new Date(dateNow)

  if(type === 'day') {
    const today = new Date(date).toISOString().split('T')[0];
    const productsToday = data.map((product: any) => {
    const todaySales = product.sales.filter((sale: any) => sale.created_at.split('T')[0] === today);
    const todayAdditions = product.addition.filter((addition: any) => addition.created_at.split('T')[0] === today);
    const { sales, addition, ...rest } = product

    return {
      ...rest,
      sales: todaySales,
      addition: todayAdditions,
    }
  });
  return productsToday;
  }
  
  
  if (type === "week") {
    const oneWeekAgo = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const oneWeekAgo1 = date.toISOString().split('T')[0];
  
    const productsWeek = data.filter((product:any) => {
      const todaySales = product.sales.filter((sale:any) => {
        const saleDate = new Date(sale.created_at).toISOString().split('T')[0];
        return saleDate >= oneWeekAgo && saleDate <= oneWeekAgo1;
      });
  
      const todayAdditions = product.addition.filter((addition:any) => {
        const additionDate = new Date(addition.created_at).toISOString().split('T')[0];
        return additionDate >= oneWeekAgo && additionDate <= oneWeekAgo1;
      });
      const { sales, addition, ...rest } = product
      return {
      ...rest,
      sales: todaySales,
      addition: todayAdditions,
    }
      
    });

    return productsWeek;
  }
  
  if (type === "fortnight") {
    const fifteenDaysAgo = new Date(date.getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const fifteenDaysAgo1 = date.toISOString().split('T')[0];
  
    const productsFifteenDays = data.filter((product:any) => {
      const todaySales = product.sales.filter((sale:any) => {
        const saleDate = new Date(sale.created_at).toISOString().split('T')[0];
        return saleDate >= fifteenDaysAgo && saleDate <= fifteenDaysAgo1;
      });
  
      const todayAdditions = product.addition.filter((addition:any) => {
        const additionDate = new Date(addition.created_at).toISOString().split('T')[0];
        return additionDate >= fifteenDaysAgo && additionDate <= fifteenDaysAgo1;
      });
  
      const { sales, addition, ...rest } = product
      return {
      ...rest,
      sales: todaySales,
      addition: todayAdditions,
    }
    });
  
    return productsFifteenDays;
  }
  
  if (type === "month") {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
    const startOfMonth1 = date.toISOString().split('T')[0];
  
    const productsMonth = data.filter((product:any) => {
      const todaySales = product.sales.filter((sale:any) => {
        const saleDate = new Date(sale.created_at).toISOString().split('T')[0];
        return saleDate >= startOfMonth && saleDate <= startOfMonth1;
      });
  
      const todayAdditions = product.addition.filter((addition:any) => {
        const additionDate = new Date(addition.created_at).toISOString().split('T')[0];
        return additionDate >= startOfMonth && additionDate <= startOfMonth1;
      });
      const { sales, addition, ...rest } = product
      return {
      ...rest,
      sales: todaySales,
      addition: todayAdditions,
    }
    });
  
    return productsMonth;
  }
  
}