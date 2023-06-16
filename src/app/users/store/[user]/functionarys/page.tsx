import { HeaderDashboard } from "@/components/headerDashbord";
import { MainFunctionarys } from "@/components/mainFunctionarys";
import { supabase } from "@/utils/supabase";

export const revalidate = 60

async function getData(id_auth:string) {
  const store = await supabase
  .from("store")
  .select()
  .eq('id_auth', id_auth)
  const id_store = store.data !== null && store.data[0].id

  const sales = await supabase
  .from("sale_product")
  .select()
  .eq('id_store', id_store)

  const additions = await supabase
  .from("addition_product")
  .select()
  .eq('id_store', id_store)

  const functionarys = await supabase
  .from("functionary")
  .select()
  .eq('id_store', id_store)


  const functionarysArray: any = [];

  function findSaleById(functionaryId:string) {
    return sales.data !== null && sales.data.filter(sale => sale.id_functionary === functionaryId);
  }
  
  function findAdditionById(functionaryId:string) {
    return additions.data !== null && additions.data.filter(addition => addition.id_product === functionaryId);
  }

  functionarys.data !== null && functionarys.data.forEach(functionary => {
    const functionaryId = functionary.id;
    const sale = findSaleById(functionaryId);
    const addition = findAdditionById(functionaryId);
  
    const functionaryObject = {
      ...functionary,
      sales: sale || [{ quantity_sold: 0, price_sold: 0 }],
      addition: addition || [{ quantity_added: 0, purchase_price: 0 }]
    };

  
    functionarysArray.push(functionaryObject);
  });
  return functionarysArray
}


export default async function Functionarys({params}:any) {
  const data = await getData(`${params.user}`)
  return (
    <>
      <HeaderDashboard />
      <MainFunctionarys data={data}/>
    </>
  )
}