import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
const prisma = new PrismaClient();
export async function POST(req: Request) {
    const { name, email, password  , role , ProfileImage } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                role: role,
                ProfileImage: ProfileImage,
                password: hashedPassword,
            }
        });
        if (user) {
            const token = jwt.sign({ id: user?.id, email: user?.email, expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) }, process.env.SECRET_KEY as string, { expiresIn: '7d' });

            const cookie = serialize("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });

            return Response.json({
                message: "User registered successfully",
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        createdAt: user.createdAt,
                        updatedAt: user.updatedAt

                    },
                    expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                },
            }, { headers: { "Set-Cookie": cookie }
            });
        }
    } catch (error) {
        console.log(error);
        return Response.json({ message: "User already exists" })
    }
}