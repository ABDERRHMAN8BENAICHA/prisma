import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

const prisma = new PrismaClient();


export async function verifyToken(token: string) {
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
        console.log(decodedToken);
        return decodedToken;
    } catch (error) {
        return null;
    }
}

function isTokenExpired(token: any): boolean {
    // const expirationDate = new Date(token.expirationDate);
    // const currentTime = new Date();
    // return currentTime.getTime() > expirationDate.getTime();
    return (new Date().getTime() > token.exp * 1000);
}


export async function POST(req: Request) {
    const { title, content } = await req.json();
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    const user = await verifyToken(token as string);
    if (!user) {
        return Response.json({
            status: 401,
            message: "Invalid token",
            auth: false
        });
    }
    if (isTokenExpired(user)) {
        return Response.json({
            status: 401,
            message: "Token expired",
            auth: false
        });
    }
    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            authorId: (user as JwtPayload)?.id,
        }
    });
    if (newPost) {
        return Response.json({
            message: "Post created successfully",
            data: newPost
        })
    }
}