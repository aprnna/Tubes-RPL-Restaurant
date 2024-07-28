'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const data = await req.formData();
  const { data:dataAuth, error } = await supabase.auth.signInWithPassword({
    email: data.get('email') as string,
    password: data.get('password') as string,
  })

  if (error) {
    console.error(error)
    redirect('/error')
  }
  const {data:dataUser, error:errorDataUser} = await supabase.from('users').select().eq('id', dataAuth.user.id).single()
  
  if (errorDataUser) {
    console.error(errorDataUser)
    redirect('/error')
  }
  switch (dataUser.role) {
    case 'manager':
      redirect('/admin')
      break;
    case 'kasir':
      redirect ('/pesanan/add')
      break;
    case 'koki':
      redirect('/pesanan/ongoing')
      break;
    case 'karyawan':
      redirect('/bahan_baku')
      break;
    case 'pelayan':
      redirect('/reservasi')
      break;
    default:
      // revalidatePath('/', 'layout')
      redirect('/error')
      break;
  }
 
}
