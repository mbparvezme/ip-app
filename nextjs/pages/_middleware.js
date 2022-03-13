import { NextResponse } from 'next/server'

export async function middleware(req) {
  let cookie = req.cookies.acctkn || null

  let protectedPaths = ['/', '/login', '/register']
  if(cookie && protectedPaths.includes(req.nextUrl.pathname)){
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  if(!cookie && (req.nextUrl.pathname === '/')){ // || req.nextUrl.pathname === '/register'
    return NextResponse.redirect(new URL('/login', req.url))
  }

  const response = await req.response;
  return response
}
