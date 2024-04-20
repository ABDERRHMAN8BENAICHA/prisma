import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getToken(request : NextRequest) {
    const token = request.cookies.get("token");
    return token;
}

export async function decodeToken(token :string) {
    return  jwt.verify(token, process.env.SECRET_KEY as string);
}
export function isTokenExpired(token: any): boolean {
    const expirationDate = new Date(token.expirationDate);
    const currentTime = new Date();
    return !(currentTime.getTime() > expirationDate.getTime());
}