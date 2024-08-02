import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { NextRequest} from 'next/server'

export async function GET() {
    const supabase = createClient()
    const { data: meja } = await supabase.from('meja').select()
    
    return getResponse(meja, 'Meja fetched successfully', 200)
  }