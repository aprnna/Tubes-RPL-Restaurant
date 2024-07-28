import getResponse from "@/utils/getResponse";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const data =  await req.formData();
  const { id } = params
  const newDataImg =  data.get('foto') as File
  let newImg = null

  if (newDataImg.size > 0) {
    const randomId = Math.floor(Math.random() * 1000)
    const { data:dataUpload, error:errUpload } = await supabase.storage.from('menu').upload(`${data.get("nama")} ${randomId}`, data.get('foto') as File)
    
    if (errUpload) return getResponse(errUpload, 'Failed to upload image', 400)
    const { data:dataImg } = await supabase.storage.from('menu').getPublicUrl(`${dataUpload.path}`)

    newImg = dataImg.publicUrl
  }
  const { data:updateData, error } = await supabase.from("menu").update({
    nama:data.get('nama') as string,
    harga:data.get('harga'),
    kategori:data.get('kategori'),
    foto:newImg?newImg:data.get('oldFoto')
  }).eq('id',id).select()

  if (error) return getResponse(error,"Failed update menu",400)

  return getResponse(updateData, "Success Update Menu",200)
}

export async function GET(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const {id} = params
  const {data, error} = await supabase.from('menu').select().eq('id',id).single()

  if (error) return getResponse(error,"Failed get menu",400)
    
  return getResponse(data, "Success Get Menu",200)
}

export async function DELETE(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const {id} = params
  const {data, error} = await supabase.from('menu').delete().eq('id',id)
  
  if (error) return getResponse(error,"Failed delete menu",400)

  return getResponse(data, "Success Delete Menu",200)
}