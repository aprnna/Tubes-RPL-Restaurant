import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = createClient()
  let data:any = []
  const { data:users } = await supabase.from('users').select()
  const { data: dataRiwayat } = await supabase.from('mengelola_bahan').select()
  const { data: bahan } = await supabase.from('bahan_baku').select()

  dataRiwayat?.map((riwayat:any)=>{
    data.push({
      nama_user: users?.find((user:any)=>user.id === riwayat.id_user)?.nama,
      jumlah: riwayat.jumlah,
      createdAt: riwayat.createdAt,
      proses: riwayat.proses,
      nama_bahan: bahan?.find((b:any)=>b.id === riwayat.id_stock)?.nama,
    })
  })

  return getResponse(data, 'Bahan Baku fetched successfully', 200)
}

