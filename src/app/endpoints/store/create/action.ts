import { ILoja } from "@/types/loja";
import { supabase } from "@/utils/supabase";

export async function actionStoreCreate({name,email,password,logo,service_start_date,end_service_date,number,address}:ILoja) {
  const { data,statusText } = await supabase
  .from("store")
  .insert({
    email,
    name,
    password,
    logo,
    service_start_date: new Date(service_start_date),
    end_service_date: new Date(end_service_date),
    number,
    address
  })
  .select()
  return data == null ? statusText : data
}