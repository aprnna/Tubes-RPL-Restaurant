import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
    const supabase = createClient()
    const { data:pesanan, error} = await supabase.from('pesanan').select('id').order('id', {ascending: false}).limit(1);

    if (error) {
        console.error('Failed to fetch last id', error)
  
        return getResponse(error, 'Failed to fetch last id', 500)
      }
  
    return getResponse(pesanan, 'Pesanan fetched successfully', 200)
  }