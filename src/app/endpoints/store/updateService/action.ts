import { supabase } from "@/utils/supabase"

export async function updateService(dataStart:any,dataEnd:any,id:any) {
const { data,statusText,error } = await supabase
  .from('store')
  .update({ 
    service_start_date: dataStart,
    end_service_date: dataEnd,
   })
  .eq('id', id)

  return data == null ? statusText : data
}