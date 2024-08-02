import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { parseISO, differenceInMinutes } from 'date-fns';
import { NextRequest } from 'next/server';
export async function POST(req: NextRequest) {
  const supabase = createClient()
  const { start, end } = await req.json()
  const { data: pesanan,error } = await supabase.from('pesanan').select('total_harga, status, createdAt, updateAt, reservasi2 (banyak_orang)').eq('status', 'selesai').gte('createdAt', start).lte('createdAt', end);
  let profit = 0
  let banyakPelanggan = 0
  let totalDifferenceInMinutes = 0;  
  let rataRataPesananSelesaiDalamJam = 0
  
  if (error) return getResponse(null, 'error fetching profit', 400)
    
    
  const pesananData = pesanan.map((item:any) => ({
    createdAt: item.createdAt,
    updateAt: item.updateAt,
    total_harga: item.total_harga,
    status: item.status,
    banyak_orang: item.reservasi2.banyak_orang,
  }));
    
  console.log(pesananData);

  pesananData.map((item: any) => {
    profit += item.total_harga
    banyakPelanggan += item.banyak_orang

    //bug disini ketika ambil mengubah createAt menjadi ISO
    
    // const createdAt = parseISO(item.createdAt);
    // const updatedAt = parseISO(item.updatedAt);
    // const differenceInMinutess = differenceInMinutes(updatedAt, createdAt);

    // totalDifferenceInMinutes += differenceInMinutess; 
  })

  // rataRataPesananSelesaiDalamJam = totalDifferenceInMinutes / pesanan?.length / 60; 

  const data = {
    profit: profit,
    banyakPelanggan: banyakPelanggan,
    // rataRataPesananSelesaiDalamJam: rataRataPesananSelesaiDalamJam 
  }

  console.log(data);


  return getResponse(data, 'profit fetched successfully', 200)
}
