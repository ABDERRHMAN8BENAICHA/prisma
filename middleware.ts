import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from './lib'

export async function middleware(request: NextRequest) {
    const token  = await getToken(request)
    if(token) {
        console.log("good")
    } else {
        console.log("bad");
    }
}

export const config = {
    matcher: '/',
}