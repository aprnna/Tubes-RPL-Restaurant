import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { Anybody } from 'next/font/google'
import { NextRequest} from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: pesanan } = await supabase.from('pesanan').select()

  return getResponse(pesanan, 'Pesanan fetched successfully', 200)
  
}

export async function POST(req: NextRequest) {
    const supabase = createClient()
    const {data:{user}, error:errorAuth} = await supabase.auth.getUser()

    if(errorAuth) return getResponse(errorAuth,"failed to get user data", 400)
    const {atasNama, banyak_orang,no_meja, status, total_harga, id_users, items} = await req.json();
    // const data = await req.formData()
    const { data: pesananBaru,error} = await supabase.from('pesanan').insert
    ([{
        atasNama: atasNama,
        banyak_orang: banyak_orang,
        no_meja: no_meja,
        status: status,
        total_harga: total_harga,
        id_users: user?.id,
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
