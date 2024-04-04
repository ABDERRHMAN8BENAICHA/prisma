import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function POST(req: Request) {
    const { id } = await req.json();
    const posts = await prisma.user.findUnique({
        where: {
            id: id
        },
        include : {
            posts: true
        }
    });

    if (!posts) {
        return Response.json({
            status: 404,
            body: {
                message: "Post not found"
            }
        })
    }
    return Response.json({
        status: 200,
        body: posts,
        count : posts.posts.length
    })
}