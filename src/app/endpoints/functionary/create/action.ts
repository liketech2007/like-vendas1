import { IFunctionary } from "@/types/functionary";
import { supabase } from "@/utils/supabase";

export async function actionChiefCreate({name,email,password,foto,id_store}:IFunctionary) {
  const { data,statusText } = await supabase
  .from("functionary")
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