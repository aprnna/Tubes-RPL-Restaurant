'use server'

import getResponse from "@/utils/getResponse"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function GET() {
  const supabase = createClient()
  const {data:{user}, error:errorAuth} = await supabase.auth.getUser()

  if(errorAuth){
    return getResponse(errorAuth, 'error get user', 500)
  }
  const { data:dataUser, error} = await supabase.from('users').select().eq('id', user?.id).single()

  if (error) {
    return getResponse(error, 'error get user', 500)
  }
  const data = {
    email: user?.email,
    ...dataUser,
  }

  return getResponse(data, 'success get user', 200)
}