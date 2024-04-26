import { NextRequest, NextResponse } from "next/server";
import { serialize } from 'cookie';
import { getToken } from "@/lib";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";



export async function POST(req: NextRequest) {
    try {
        const token : RequestCookie | undefined = await getToken(req);
        if (!token) {
            return NextResponse.json({
                status: 401,
                body: {
                    message: "User not logged in"
                }
            });
        }
        const cookie = serialize("token", String(token), {
            httpOnly: true,
            maxAge: -1,
            path: "/",
        });
        return NextResponse.json({
            status: 200,
            body: {
                message: "User logged out successfully"
            }
        }, { headers: { "Set-Cookie": cookie } })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: "Internal Server Error",
                error
            }
        })
    }
}
