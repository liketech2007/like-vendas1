import { IFunctionary } from "@/types/functionary";
import { supabase } from "@/utils/supabase";

export async function actionFunctionaryCreate({name,email,password,id_auth,id_store}:IFunctionary) {
  const { data,statusText } = await supabase
  .from("functionary")
  .insert({
    email,
    name,
    id_store,
    password,
    auth: true,
    id_auth
  })
  .select()
  return data == null ? statusText : data
}