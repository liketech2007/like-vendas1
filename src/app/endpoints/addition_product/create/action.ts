import { IAdditionProduct } from "@/types/addition_product";
import { supabase } from "@/utils/supabase";

export async function actionChiefCreate({id_store,id_product,id_functionary,quantity_added,purchase_price}:IAdditionProduct) {
  const { data,statusText } = await supabase
  .from("addition_product")
  .insert({
    id_store,
    id_functionary,
    id_product,
    quantity_added,
    purchase_price
  })
  .select()
  return data == null ? statusText : data
}