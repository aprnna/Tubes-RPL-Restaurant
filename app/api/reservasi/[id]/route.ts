import { createClient } from "@/utils/supabase/server"
import getResponse from "@/utils/getResponse"
import { NextRequest } from "next/server"

export async function GET({params}:any) {
  const supabase = createClient()
  const { id } = params
  const { data: reservasi } = await supabase.from('reservasi').select().eq('id', id).single() 

  return getResponse(reservasi, 'Pesanan fetched successfully', 200)
}

export async function PUT(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const { id } = params
  const {
    atasNama, jumlahOrang, nomorHp, noMeja
  } = await req.json();

  
  let status = "";
  
  if(!noMeja){
    status = "waiting";
    
    return getResponse(null, 'Silahkan Isi Dahulu No Meja', 400);
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
  
  console.log(atasNama, jumlahOrang, noMeja, nomorHp, id);
  const { data: reservasi, error } = await supabase.from('reservasi2').update([{
    id_user: user?.id,
    no_meja: noMeja,
    status: status,
    atas_nama: atasNama,
    banyak_orang: jumlahOrang,
    no_telp: nomorHp,
  }]).eq('id',id).select()

  if (error) {
    console.error('Reservasi insert failed', error)
    
    return getResponse(error, 'Reservasi insert failed', 400)
  }

  if (status == "ontable"){
    const { error:err } = await supabase.from('meja').update({
      status: "Full"
    }).eq('no_meja', noMeja).select()
  
    if (err) {
      console.error('Reservasi update failed', err)
  
      return getResponse(err, 'error update reservasi', 500)
    }
  }

  return getResponse(reservasi, 'Update Reservasi successfully', 201)
}