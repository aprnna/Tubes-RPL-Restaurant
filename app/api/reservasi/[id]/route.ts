import { createClient } from "@/utils/supabase/server"
import getResponse from "@/utils/getResponse"

export async function GET({params}:any) {
  const supabase = createClient()
  const { id } = params
  const { data: reservasi } = await supabase.from('reservasi').select().eq('id', id).single() 

  return getResponse(reservasi, 'Pesanan fetched successfully', 200)
}