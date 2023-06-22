import { HeaderDashboard } from "@/components/headerDashbord";
import { MainNotas } from "@/components/mainNotas";
import { supabase } from "@/utils/supabase";

export const revalidate = 0

async function getData(id_auth:string) {
  const store = await supabase
  .from("store")
  .select()
  .eq('id_auth', id_auth)
  const id_store = store.data !== null && store.data[0].id
  
  const notes = await supabase
  .from("note")
  .select()
  .eq('id_store', id_store)

  return notes.data

}  

export default async function Nostas({params}:any) {
    const data = await getData(`${params.user}`)
    return (
        <>
            <HeaderDashboard />
            <MainNotas data={data} />
        </>
    )
}