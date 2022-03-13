import { NextResponse } from 'next/server'

export async function middleware(req) {
  let cookie = req.cookies.acctkn || null

  if(!cookie){
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if(cookie && req.nextUrl.pathname === '/'){
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  const response = await req.response;
  return response
}
