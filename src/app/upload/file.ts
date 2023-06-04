import { supabase } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

export async function uploadFile(file:any, fileName:string) {
  const filename = fileName.split(".");
  const uid = uuidv4();
  const { data, error } = await supabase
    .storage
    .from('image')
    .upload(`${filename[0]}${uid}.png`, file, {
      cacheControl: '3600',
      upsert: false
    })
    const res = supabase
    .storage
    .from('image')
    .getPublicUrl(`${data?.path}`);

    return res == null ? error : res.data.publicUrl
}