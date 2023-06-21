import { HeaderDashboard } from "@/components/headerDashbord";
import { MainStore } from "@/components/mainStore";
import { supabase } from "@/utils/supabase";

export const revalidate = 0

async function getData(id_auth:string) {
  const store = await supabase
  .from("store")
  .select()
  .eq('id_auth', id_auth)
  const id_store = store.data !== null && store.data[0].id
  
  const chief  = await supabase
  .from("chief")
  .select()
  .eq('id_store', id_store)

  return chief.data
} 

export default async function Store({params}:any) {
  const data = await getData(`${params.user}`)
  return (
    <>
       <HeaderDashboard />
       <MainStore data={data} />
    </>
  )
}