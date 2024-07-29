'use server'

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import getResponse from '@/utils/getResponse'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const data = await req.formData();
  const { data:dataAuth, error } = await supabase.auth.signInWithPassword({
    email: data.get('email') as string,
    password: data.get('password') as string,
  })  

  if (error) {
    console.error(error)

    return getResponse(error, 'error login', 400)
  }
  const {data:dataUser, error:errorDataUser} = await supabase.from('users').select().eq('id', dataAuth.user.id).single()
  
  if (errorDataUser) {
    console.error(errorDataUser)

    return getResponse(errorDataUser, 'error login', 400)
  }

  let redirectTo = '/error'; // Default redirect URL

  switch (dataUser.role) {
    case 'manager':
      redirectTo = '/admin';
      break;
    case 'pelayan':
      redirectTo = '/pesanan/add';
      break;
    case 'koki':
      redirectTo = '/pesanan/ongoing';
      break;
    case 'karyawan':
      redirectTo = '/bahan_baku';
      break;
  }

  return NextResponse.redirect(new URL(redirectTo, req.url))
}
