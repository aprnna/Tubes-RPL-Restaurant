import { type NextRequest,  NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from './utils/supabase/server';
import { redirect } from 'next/navigation';
export async function middleware(req: NextRequest) {

  await updateSession(req)
  const { pathname } = req.nextUrl;

  // Allow requests to /api and /login to pass through
  const allowedPaths = ['/error/unauthorized','/error'];

  if (pathname == '/') return NextResponse.redirect(new URL('/auth/login', req.url));
  if (pathname.startsWith('/api') || pathname.startsWith('/auth') || allowedPaths.includes(pathname)) {

    return NextResponse.next();
  }

  const supabase = createClient();
  const {data:{user}, error:errorAuth} = await supabase.auth.getUser()

  if (errorAuth ) return NextResponse.redirect(new URL('/auth/login', req.url));
  const { data, error} = await supabase.from('users').select('role').eq('id', user?.id).single()
  const role = data?.role

  if (error) console.error(error)
  const roleAccess: { [key: string]: string[] } = {
    manager: ['/admin','/admin/karyawan'],
    kasir: ['/pesanan/add', '/pesanan'],
    koki: ['/menu','/pesanan/ongoing'],
    karyawan: ['/bahan_baku','/bahan_baku/riwayat'],
    pelayan: ['/reservasi']
  };

  if(role){
    const allowedRoutes = roleAccess[role] || [];

    if (!allowedRoutes || !allowedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/error/unauthorized', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}