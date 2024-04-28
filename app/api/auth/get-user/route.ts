import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
    const { id } = await req.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                Products: true
            }
        });
        if (user) {
            return NextResponse.json({
                status: 200,
                message: "User found",
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        ProfileImage: user.ProfileImage,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt,
                        products: user.Products
                    },
                }
            });
        }
        return NextResponse.json({ message: "User not found" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error in finding user" });
    }
}