import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function DELETE(req: Request) {
    const { email } = await req.json();
    try {
        const user = await prisma.user.delete({
            where: {
                email: email
            }
        });
        return Response.json({
            message: "User deleted successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "User not found" })
    }
}

