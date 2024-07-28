import { createClient } from "@/utils/supabase/server"
import getResponse from "@/utils/getResponse"
import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
export async function PUT(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const { id } = params
  const {
    nama, umur, no_telp, role
  } = await req.json();
  const { data: user, error } = await supabase.from('users').update({
    nama: nama,
    umur: umur,
    no_telp: no_telp,
    role: role,
  }).eq('id',id).single()

  if(error) return getResponse(error, 'error update user', 400) 

  return getResponse(user, 'users fetched successfully', 200)
}

export async function DELETE(req:NextRequest,{params}:any) {
  const supabase = supabaseAdmin()
  const { id } = params
  const { data, error } = await supabase.auth.admin.deleteUser(id)
  
  if (error) return getResponse(error, 'error delete user', 400)

  return getResponse(data, 'user delete successfully', 200)
}