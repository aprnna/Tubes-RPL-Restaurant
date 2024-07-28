import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  
  try {
    // Mengambil pesanan dengan status ongoing
    const { data: pesananOngoing, error } = await supabase
      .from('pesanan')
      .select('*')
      .eq('status', 'ongoing')

    if (error) {
      console.error('Failed to fetch ongoing orders', error)

      return getResponse(error, 'Failed to fetch ongoing orders', 500)
    }

    return getResponse(pesananOngoing, 'Ongoing orders fetched successfully', 200)
  } catch (error) {
    console.error('Internal server error', error)

    return getResponse(error, 'Internal server error', 500)
  }
}
