import getResponse from "@/utils/getResponse"
import { createClient } from "@/utils/supabase/server"


export async function GET() {
    const supabase = createClient()
    const { data: reservasi } = await supabase.from('reservasi').select()
  
    return getResponse(reservasi, 'Pesanan fetched successfully', 200)
  }