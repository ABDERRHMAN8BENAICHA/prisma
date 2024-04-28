import { PrismaClient } from "@prisma/client";
import { NextRequest  , NextResponse} from "next/server";
const prisma = new PrismaClient();
export async function POST(req : NextRequest){
    try {
        const {id} =  await req.json()
        const product = await prisma.product.findUnique({
            where : {
                id : id
            },
            include: {
                owner : true
            }
        });
        return NextResponse.json({
            status : 200,
            body : product
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            status : 400,
            message : "Something went wrong"
        })
    }
}