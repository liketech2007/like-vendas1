import { IChief } from "@/types/chief";
import { supabase } from "@/utils/supabase";

export async function actionChiefCreate({name,email,password,id_auth,id_store}:IChief) {
  const { data,statusText,error } = await supabase
  .from("chief")
  .insert({
    email,
    name,
    id_store,
    password,
    auth: true,
    id_auth,
  })
  .select()
  return data == null ? statusText : data
}