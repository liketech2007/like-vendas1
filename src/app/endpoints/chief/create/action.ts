import { IChief } from "@/types/chief";
import { supabase } from "@/utils/supabase";

export async function actionChiefCreate({name,email,password,foto,id_store}:IChief) {
  const { data,statusText } = await supabase
  .from("chief")
  .insert({
    email,
    name,
    id_store,
    password,
    foto
  })
  .select()
  return data == null ? statusText : data
}