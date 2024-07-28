import AccountForm from './account-form'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()
  const {
    data,
    error
  } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect('/auth/login')
  }

  return <AccountForm user={data.user} />
}