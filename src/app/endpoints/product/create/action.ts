import { IProduct } from "@/types/product";
import { supabase } from "@/utils/supabase";

export async function actionProductCreate({name,price,id_store,description,quantity,category,minimum_stock_level}:IProduct) {
  
  const { data,statusText,error } = await supabase
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
  console.log(data,statusText,error)
  return data == null ? statusText : data
}