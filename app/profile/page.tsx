import Logout from "@/components/Logout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hook/useUser";
import { decodeToken } from "@/lib";
import axios from "axios";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
export type MydecodedToken = {
    id: string;
    email: string;
    ProfileImage: string;
    expirationDate: number;
}

interface UserType {
    id: string;
    name: string;
    email: string;
    role: string;
    ProfileImage: string;
    createdAt: string;
    updatedAt: string;
    products: any[];
}

export default async function Page() {
    const token: string | undefined = cookies().get("token")?.value;
    const mydecodedToken: MydecodedToken = decodeToken(token ?? "") as MydecodedToken;
    const user: UserType = await useUser(mydecodedToken.id);
    console.log(user);
    //const trimmedUrl = mydecodedToken.ProfileImage.substring(1, mydecodedToken.ProfileImage.length - 1);
    return (
        <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-sky-500 text-2xl text-center mt-4">Profile Page</h1>
            <div className="rounded-md shadow-lg border  w-[50%] h-80 flex justify-center items-center gap-8">
                {/* <div>
                    {
                        user && (
                            <Image width={200} height={200} src={user.ProfileImage?.substring(1, mydecodedToken.ProfileImage.length - 1)} alt="Profile Image" objectFit="cover" className="rounded-full" />
                        )
                    }
                </div> */}
                <div>
                    <Avatar className="w-[100px] h-[100px]">
                        <AvatarImage  src={user.ProfileImage?.substring(1, mydecodedToken.ProfileImage.length - 1)} alt="@shadcn" />
                        <AvatarFallback className="text-2xl">
                            {
                                mydecodedToken.email.charAt(0).toUpperCase()
                            }
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <h1 className="dark:text-white text-black  text-2xl font-bold">Email : {user.email}</h1>
                    <h1 className="dark:text-white text-black  text-2xl font-bold">Name : {user.name}</h1>
                    <h1 className="dark:text-white text-black  text-2xl font-bold">Role : {user.role}</h1>
                </div>
            </div>
            <div className="
            flex
            flex-row
            gap-4
            items-center
            justify-center
            ">
                {

                    user.role === "ADMIN" && (
                        <>
                            <Button variant="default">
                                <Link href="/admin">Admin Dashboard</Link>
                            </Button>
                        </>)
                }
                {
                    user.role === "OWNER" && (
                        <>
                            <Button>
                                <Link href="/owner">User Dashboard</Link>
                            </Button>
                        </>)
                }
                <Logout />
            </div>
        </div>
    )
}