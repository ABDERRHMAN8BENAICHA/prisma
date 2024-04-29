import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const { search } = await req.json();
    const trimmedSearch = search.trim();
    try {
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: trimmedSearch,
                        }
                    },
                    {
                        description: {
                            contains: trimmedSearch,
                        }
                    },
                    {
                        type: {
                            contains: trimmedSearch,
                        }
                    },
                    {
                        status: "APPROVED"
                    }
                ]
            }
        });
        if(products.length === 0){
            return NextResponse.json({
                status: 404,
                body: {
                    message: 'No products found',
                    data: []
                }
            });
        }
        return NextResponse.json({
            status: 200,
            body: {
                message: 'Products found',
                data: products
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({
            status: 500,
            body: {
                message: 'Error fetching data'
            }
        });

    }
}