import { ISaleProduct } from "@/types/sale_product";
import { supabase } from "@/utils/supabase";

export async function actionSaleCreate({id_store,id_product,id_functionary,quantity_sold,price_sold}:ISaleProduct) {
  const { data,statusText } = await supabase
  .from("sale_product")
  .insert({
    id_store,
    id_functionary,
    id_product,
    quantity_sold,
    price_sold
  })
  .select()
  return data == null ? statusText : data
}