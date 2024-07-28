'use server'

import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import getResponse from '@/utils/getResponse'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const {email, password,nama, umur, no_telp, role} = await req.json();
  const { data:dataAuth, error } = await supabase.auth.signUp({
    email: email as string,
    password: password as string,
  })

  if (error) {
    console.error(error)

    return getResponse(error, 'error login', 400)
  }

  const { error:errorInsert } = await supabase.from('users').upsert({
    id: dataAuth.user?.id as string,
    nama: nama as string,
    umur: umur,
    no_telp: no_telp as string,
    role: role as string,
    updatedAt: new Date().toISOString(),
  })

  if(errorInsert) {
    console.error(errorInsert)
    
    return getResponse(errorInsert, 'error create new user', 400)
  }

  return getResponse(dataAuth, 'success create new user', 200)
}