import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return Response.json({ message: "User not found" });
            }
            const token = jwt.sign({ id: user?.id, email: user?.email, expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) }, process.env.SECRET_KEY as string, { expiresIn: '7d' });
            const cookie = serialize("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            return Response.json({
                message: "User found",
                data: {
                    expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        ProfileImage: user.ProfileImage,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt

                    },
                }
            },
                { headers: { "Set-Cookie": cookie } }
            );
        }
        return Response.json({ message: "User not found" });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "Error in finding user" });
    }
}