// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//     const token = request.cookies.get("token")?.value;
//     console.log(token);
//     if (!token) {
//         return NextResponse.json({
//             message: "Invalid token",
//             auth: false
//         }, { status: 401 });
//     }

//     // Proceed with the request
//     return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: '/app/api/posts/',
// }
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const token = request.cookies.has("token");
    console.log("my token :",token);
    if (!token) {
        return NextResponse.json({
            status: 401,
            message: "Invalid token",
            auth: false
        }, { status: 401 });
    }

    // Proceed with the request
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}
