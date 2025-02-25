import getResponse from "@/utils/getResponse"
import { createClient } from "@/utils/supabase/server"
import { NextRequest } from "next/server"


export async function GET() {
    const supabase = createClient()
    const { data: reservasi } = await supabase.from('reservasi').select(`*, users ( nama )`)
    const transformReservasiData = (reservasi:any) => {
      return reservasi.map((item:any) => ({
        id: item.id,
        id_user: item.id_user,
        no_meja: item.no_meja,
        tanggal: item.tanggal,
        atas_nama: item.atas_nama,
        banyak_orang: item.banyak_orang,
        no_telp: item.no_telp,
        status: item.status,
        nama_pelayan: item.users.nama,
      }));
    };

    return getResponse(transformReservasiData(reservasi), 'Pesanan fetched successfully', 200)
  }

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const {
    atasNama, jumlahOrang, nomorHp, noMeja, tanggal
  } = await req.json();

  console.log(atasNama, jumlahOrang, noMeja, nomorHp, tanggal);

  let status = "";

  if(!noMeja){
    status = "waiting";
  }else{
    status = "ontable";
    const { data: meja, error: mejaError } = await supabase
    .from('meja')
    .select('kapasitas')
    .eq('no_meja', noMeja)
    .single();

    if (mejaError) {
      return getResponse(null, 'Failed to fetch table data', 500);
    }

    if (jumlahOrang > meja.kapasitas) {
      return getResponse(null, 'Jumlah orang melebihi kapasitas meja', 400);
    }
  }
  
  const {data:{user}, error:errorAuth} = await supabase.auth.getUser()

  if (errorAuth) return getResponse(errorAuth, 'error get user', 500)


  const { data: reservasi, error } = await supabase.from('reservasi').insert({
    id_user: user?.id,
    no_meja: noMeja,
    status: status,
    atas_nama: atasNama,
    banyak_orang: jumlahOrang,
    no_telp: nomorHp,
    tanggal: tanggal
  }).select().single()
  
  if (error) {
    console.error('Reservasi insert failed', error)
    
    return getResponse(error, 'Reservasi insert failed', 400)
  }

  if (status == "ontable"){
    const { error:err } = await supabase.from('meja').update({
      status: "Full"
    }).eq('no_meja', noMeja).select()
  
    if (err) {
      console.error('Bahan insert failed', err)
  
      return getResponse(err, 'error insert mengelola bahan', 500)
    }
  }

  return getResponse(reservasi, 'Bahan insert successfully', 201)
}