// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import isMongoID from './helpers/isMongoID';

export function middleware(req: NextRequest) {
  
  // Middlewares
  isMongoID(req);

  // console.log({ req: req.nextUrl.pathname });

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: ['/api/:path/', '/api/entries/:path/'],
};
