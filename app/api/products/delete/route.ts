import { getToken } from "@/lib";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function DELETE(req: NextRequest) {
    const { idProduct } = await req.json()
    if (getToken(req) === null) {
        return NextResponse.json({
            status: 401,
            body: {
                message: 'Unauthorized'
            }
        })
    }
    try {
        const deleteProduct = await prisma.product.delete({
            where: {
                id: idProduct
            }
        })
        if (deleteProduct) {
            return NextResponse.json({
                status: 200,
                body: {
                    message: 'Product deleted',
                    deleteProduct
                }
            })
        } else {
            return NextResponse.json({
                status: 404,
                body: {
                    message: 'Product not found'
                }
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            body: {
                message: 'Internal Server Error',
                error
            }
        })
    }
}