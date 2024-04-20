import { decodeToken, getToken, isTokenExpired } from "@/lib";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const token = await getToken(req);
    if (token) {
        const  decodedToken = await decodeToken(token.value);
        const isValide  = isTokenExpired(decodedToken);
        console.log(isValide);
        
        return NextResponse.json({ message: "Product created successfully" , data: decodedToken});
    }
    return NextResponse.json({message: "Unauthorized"});
    // try {
    //     const product = await prisma.product.create({
    //         data: {
    //             title,
    //             description,
    //             type,
    //             evaluation,
    //             price,
    //             images,
    //             ownerId : "1"
    //         }
    //     });
    //     return Response.json({
    //         message: "Product created successfully",
    //         data: product
    //     });
    // } catch (error) {
    //     console.log(error);
    //     return Response.json({ message: "Error in creating product" });
    // }
}