import { ILoja } from "@/types/loja";
import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { render } from "@react-email/render"
import EmailConfirme from "@/components/emailConfirme";

export async function actionStoreCreate({name,email,password,logo,service_start_date,end_service_date,number,address,time_close,time_open}:ILoja) {
  const id_auth = uuidv4()
  const res = await supabase
  .from("store")
  .insert({
    email,
    name,
    password,
    logo,
    service_start_date: new Date(service_start_date),
    end_service_date: new Date(end_service_date),
    time_close,
    time_open,
    number,
    id_auth,
    address
  })
  .select()
  if(res.error === null && res.data) {
   await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/email?id=1&email=${email}&subject=${"Confiemação de Email"}&html=${render(EmailConfirme(id_auth))}`,{
    method: "GET"
   })
  }
  return res 
}