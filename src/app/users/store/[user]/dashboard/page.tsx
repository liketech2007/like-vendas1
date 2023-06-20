import { HeaderDashboard } from "@/components/headerDashbord";
import { MainDashboard } from "@/components/mainDashboard";
import { supabase } from "@/utils/supabase";

export const revalidate = 1

async function getData(id_auth:string) {
  const store = await supabase
  .from("store")
  .select()
  .eq('id_auth', id_auth)
  const id_store = store.data !== null && store.data[0].id
  
  const products  = await supabase
  .from("product")
  .select()
  .eq('id_store', id_store)

  const sales = await supabase
  .from("sale_product")
  .select()
  .eq('id_store', id_store)

  const additions = await supabase
  .from("addition_product")
  .select()
  .eq('id_store', id_store)

  const productsArray: any = [];

  function findSaleById(productId:string) {
    return sales.data !== null && sales.data.filter(sale => sale.id_product === productId);
  }
  
  function findAdditionById(productId:string) {
    return additions.data !== null && additions.data.filter(addition => addition.id_product === productId);
  }

  products.data !== null && products.data.forEach(product => {
    const productId = product.id;
    const sale = findSaleById(productId);
    const addition = findAdditionById(productId);
  
    const productObject = {
      ...product,
      sales: sale || [{ quantity_sold: 0, price_sold: 0, created_at: "" }],
      addition: addition || [{ quantity_added: 0, purchase_price: 0, created_at: "" }]
    };
  
    productsArray.push(productObject);
  });
  return productsArray
}

export default async function Dashboard({params}:any) {
  const data = await getData(`${params.user}`)
  return (
    <>
      <HeaderDashboard />
      <MainDashboard data={data}/>
    </>
  )
}