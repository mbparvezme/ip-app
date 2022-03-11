import { NextResponse } from 'next/server'

export async function middleware(req) {

  let cookie = req.cookies.acctkn || null

  if(cookie && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')){
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const response = await req.response;
  return response

}
