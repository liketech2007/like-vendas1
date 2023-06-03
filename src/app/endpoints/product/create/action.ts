import { IProduct } from "@/types/product";
import { supabase } from "@/utils/supabase";

export async function actionChiefCreate({name,price,id_store,description,quantity,category,minimum_stock_level}:IProduct) {
  const { data,statusText } = await supabase
  .from("product")
  .insert({
    name,
    id_store,
    price,
    description,
    quantity,
    category,
    minimum_stock_level
  })
  .select()
  return data == null ? statusText : data
}