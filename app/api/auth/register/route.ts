import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
const prisma = new PrismaClient();
export async function POST(req: Request) {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword,
                name: name,
            }
        });
        if (user) {
            const token = jwt.sign({ id: user?.id, email: user?.email, expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) }, process.env.SECRET_KEY as string, { expiresIn: '7d' });

            const cookie = serialize("token", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 30,
                path: "/",
            });

            return Response.json({
                message: "User already exists",
                data: {
                    user,
                    expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
                },
            }, { headers: { "Set-Cookie": cookie }
            });
        }
        console.log(user);
        return Response.json({
            message: "User registered successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        return Response.json({ message: "User already exists" })
    }
}