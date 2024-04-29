import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function GET() {
    try {
        const allProducts = await prisma.product.findMany(
            {
                include: {
                    owner: true
                }
            }
        );
        return NextResponse.json({
            status: 200,
            body: allProducts
        })
    } catch (error) {
        console.error('Error decoding token:', error);
        return NextResponse.json({
            status: 500,
            body: { error: "Internal Server Error" }
        })
    }
}