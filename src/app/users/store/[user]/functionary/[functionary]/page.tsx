import { HeaderDashboard } from "@/components/headerDashbord";
import { MainFunctionary } from "@/components/mainFunctionary";
import { supabase } from "@/utils/supabase";

export const revalidate = 1

async function getData(id_auth:string) {

  const sales = await supabase
  .from("sale_product")
  .select()
  .eq('id_functionary', id_auth)

  const additions = await supabase
  .from("addition_product")
  .select()
  .eq('id_functionary', id_auth)

  const functionarys = await supabase
  .from("functionary")
  .select()
  .eq('id', id_auth)


  const functionarysArray:any = [];

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
      sales: sale || [{ quantity_sold: 0, price_sold: 0, created_at: "" }],
      addition: addition || [{ quantity_added: 0, purchase_price: 0, created_at: "" }]
    };

  
    functionarysArray.push(functionaryObject);
  });
  return functionarysArray
}

export default async function Functionary({params}:any) {
  const data = await getData(`${params.functionary}`)

  return (
    <>
      <HeaderDashboard />
      <MainFunctionary dataFunctionary={data} />
    </>
  )
}