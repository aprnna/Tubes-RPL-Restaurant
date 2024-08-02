import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { Anybody } from 'next/font/google'
import { NextRequest} from 'next/server'

export async function GET() {
  const supabase = createClient();
  
  const { data: pesananData, error } = await supabase
    .from('pesanan')
    .select(`
      id, 
      no_meja, 
      createdAt, 
      total_harga, 
      status, 
      id_reservasi,
      reservasi(atas_nama, banyak_orang)
    `)
    
  if (error) {
    return getResponse(null, 'Error fetching pesanan', 500);
  }

  const pesanan = pesananData.map((item:any) => ({
    id: item.id,
    no_meja: item.no_meja,
    createdAt: item.createdAt,
    total_harga: item.total_harga,
    status: item.status,
    id_reservasi: item.id_reservasi,
    atas_nama: item.reservasi.atas_nama,
    banyak_orang: item.reservasi.banyak_orang,
  }));
  
  return getResponse(pesanan, 'Pesanan fetched successfully', 200);
}

export async function POST(req: NextRequest) {
    const supabase = createClient()
    const {data:{user}, error:errorAuth} = await supabase.auth.getUser()

    if(errorAuth) return getResponse(errorAuth,"failed to get user data", 400)
    const {idReservasi, atasNama, banyak_orang,no_meja, status, total_harga, id_users, items} = await req.json();
    // const data = await req.formData()
    const { data: pesananBaru,error} = await supabase.from('pesanan').insert
    ([{
        no_meja: no_meja,
        status: status,
        total_harga: total_harga,
        id_user: user?.id,
        id_reservasi: idReservasi,
    }]).select()

    if (error) {
      console.error('Pesanan Post failed', error)
      getResponse(error, 'Pesanan Post failed', 400)
    }

    if (pesananBaru) {
      const id_pesanan = pesananBaru[0].id;
      
      for (const item of items) {
          const { id_menu, jumlah } = item;
          const { data: itemPesanan, error: itemPesananError } = await supabase.from('item_pesanan').insert({
              id_pesanan,
              id_menu,
              jumlah,
          }).select();

          if (itemPesananError) {
              console.error('Item Pesanan Post failed', itemPesananError);

              return getResponse(itemPesananError, 'Item Pesanan Post failed', 400);
          }
      }
      
      return getResponse(pesananBaru, 'Pesanan created successfully', 200);
  }
}
