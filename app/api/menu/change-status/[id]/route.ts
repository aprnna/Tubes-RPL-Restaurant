import getResponse from "@/utils/getResponse";
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function PUT(req:NextRequest,{params}:any) {
  const supabase = createClient()
  const { id } = params
    
  const { data, error } = await supabase.from("menu").select('tersedia').eq('id',id).single()
  
  if (error) return getResponse(error,"Failed get menu",400)
  const { data:updateData, error:updateError } = await supabase.from("menu").update({
    tersedia:!data.tersedia,
  }).eq('id',id).select()

  if (updateError) return getResponse(error,"Failed update menu",400)

  return getResponse(updateData, "Success Update Menu",200)
}
