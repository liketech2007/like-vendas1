import { PageAdim } from "@/components/pageAdim";
import { supabase } from "@/utils/supabase";

export const revalidate = 0

async function getData() {
  const stores = await supabase
  .from("store")
  .select()
  const feedbacks = await supabase
  .from("feedback")
  .select()

  return [{
    stores: stores.data,
    feedbacks: feedbacks.data
  }]
}
export default async function Adim() {
    const data = await getData()
    return (
        <PageAdim data={data} />
    )
}