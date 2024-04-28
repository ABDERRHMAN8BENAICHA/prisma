import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function getToken(request: NextRequest): Promise<RequestCookie | undefined> {
    const token = request.cookies.get("token");
    return token;
}

export function decodeToken(token: string) {
    if (!token) {
        return null;
    }
    return (jwt.verify(token, process.env.SECRET_KEY as string));
}
export function isTokenExpired(token: any): boolean {
    const expirationDate = new Date(token.expirationDate);
    const currentTime = new Date();
    return (currentTime.getTime() > expirationDate.getTime());
}

export function getCookie(name: string) {
    return cookies().get(name)?.value;
}