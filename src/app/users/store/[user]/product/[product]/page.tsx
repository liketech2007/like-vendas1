import { HeaderDashboard } from "@/components/headerDashbord";
import { MainProduct } from "@/components/mainProduct";
import { supabase } from "@/utils/supabase";

export const revalidate = 0

async function getData(id_auth:string) {

  const sales = await supabase
  .from("sale_product")
  .select()
  .eq('id_product', id_auth)

  const additions = await supabase
  .from("addition_product")
  .select()
  .eq('id_product', id_auth)

  const products = await supabase
  .from("product")
  .select()
  .eq('id', id_auth)


  const productsArray:any = [];

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

export default async function Product({params}:any) {
  const data = await getData(`${params.product}`)

  return (
    <>
       <HeaderDashboard />
       <MainProduct dataProduct={data} id_product={params.product} />
    </>
  )
}