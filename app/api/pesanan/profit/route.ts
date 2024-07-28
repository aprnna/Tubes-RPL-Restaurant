import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { parseISO, differenceInMinutes } from 'date-fns';
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { start, end } = await req.json()
  const { data: pesanan,error } = await supabase.from('pesanan').select().eq('status', 'selesai').gte('createdAt', start).lte('createdAt', end);
  let profit = 0
  let banyakPelanggan = 0
  let totalDifferenceInMinutes = 0;  
  let rataRataPesananSelesaiDalamJam = 0

  if (error) return getResponse(null, 'error fetching profit', 400)

  pesanan.map((item: any) => {
    profit += item.total_harga
    banyakPelanggan += item.banyak_orang
    const createdAt = parseISO(item.createdAt);
    const updatedAt = parseISO(item.updatedAt);
    const differenceInMinutess = differenceInMinutes(updatedAt, createdAt);

    totalDifferenceInMinutes += differenceInMinutess; 
  })

  rataRataPesananSelesaiDalamJam = totalDifferenceInMinutes / pesanan?.length / 60; 

  const data = {
    profit: profit,
    banyakPelanggan: banyakPelanggan,
    rataRataPesananSelesaiDalamJam: rataRataPesananSelesaiDalamJam 
  }

  return getResponse(data, 'profit fetched successfully', 200)
}
