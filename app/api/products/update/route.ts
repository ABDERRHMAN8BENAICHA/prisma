import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

interface ProductUpdateInput {
    // existing properties...
    ProfileImage?: string;
}
export async function PUTCH(req: NextRequest) {
    const { id,title, description, type, evaluation, price, ProfileImage } = await req.json();
    try {

        const updateProduct = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                title,
                description,
                type,
                evaluation: Number(evaluation),
                price: Number(price),
                ProfileImage: ProfileImage as string
            }
        });
        return NextResponse.json({
            status: 200,
            body: updateProduct
        })
    } catch (error) {
        console.error('Error decoding token:', error);
        return NextResponse.json({
            status: 500,
            body: { error: "Internal Server Error" }
        })
    }
}