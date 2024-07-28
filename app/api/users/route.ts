import getResponse from '@/utils/getResponse'
import { createClient } from '@/utils/supabase/server'
import { NextRequest } from 'next/server'
import { supabaseAdmin } from '@/utils/supabase/admin'

export async function GET() {
  const supabase = createClient()
  const { data: user } = await supabase.from('users').select().neq('role', 'manager')

  return getResponse(user, 'users fetched successfully', 200)
}

export async function POST(req: NextRequest) {
  const supabase = supabaseAdmin()
  const {email, password,nama, umur, no_telp, role} = await req.json();

  const { data:dataAuth, error } = await supabase.auth.admin.createUser({
    email: email as string,
    password: password as string,
    email_confirm: true
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