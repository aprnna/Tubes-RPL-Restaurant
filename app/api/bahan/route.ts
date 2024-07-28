import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const supabase = createClient()
  const { data: menu } = await supabase.from('bahan_baku').select().eq('status', 'TRUE')

  return getResponse(menu, 'Bahan Baku fetched successfully', 200)
}

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const {
    nama, jumlah, satuan
  } = await req.json();
  const {data:{user}, error:errorAuth} = await supabase.auth.getUser()

  if (errorAuth) return getResponse(errorAuth, 'error get user', 500)

  const { data: bahan_baku, error } = await supabase.from('bahan_baku').insert({
    nama: nama,
    jumlah: jumlah,
    satuan: satuan,
  }).select().single()
  
  if (error) {
    console.error('Bahan insert failed', error)
    
    return getResponse(error, 'Bahan insert failed', 400)
  }
  const { error:err } = await supabase.from('mengelola_bahan').insert({
    jumlah: jumlah,
    id_user: user?.id,
    id_stock: bahan_baku?.id,
    proses:'Create'
  }).select()

  if (err) {
    console.error('Bahan insert failed', err)

    return getResponse(err, 'error insert mengelola bahan', 500)
  }

  return getResponse(bahan_baku, 'Bahan insert successfully', 201)
}


