import  { decodeToken,getToken, isTokenExpired } from "@/lib";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { title, description, type, evaluation, price, image} = await req.json()
    const token = await getToken(req);
    if (!token) {
        return NextResponse.json({ message: "Token is required" });
    }
    const decodedToken = await decodeToken(token.value);
    const isValide: boolean = isTokenExpired(decodedToken);
    if (isValide) {
        return NextResponse.json({ message: "Token is not valide" });
    }
    try {
        const product = await prisma.product.create({
            data: {
                title,
                description,
                type,
                evaluation,
                price,
                image,
                ownerId: (decodedToken as JwtPayload).id as string
            }
        });
        return NextResponse.json({
            message: "Product created successfully",
            data: product
        });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Error in creating product" });
    }
    // return NextResponse.json({ message: "Product created successfully"});
}