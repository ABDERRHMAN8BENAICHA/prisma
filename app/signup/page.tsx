"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useEdgeStore } from "@/lib/edgestore"
import { SingleImageDropzone } from "@/components/SingleImageDropzone"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"
import { SingleImageDropzoneUsage } from "@/components/SingleImageDropzoneUsage"
export function ButtonLoading({ className }: { className?: string }) {
    return (
        <Button disabled className="w-full">
            <ReloadIcon className={`mr-2 h-4 w-4 animate-spin `} />
            Please wait
        </Button>
    )
}
export default function LoginPage() {
    const { push } = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        axios.post("/api/auth/register", { email, password, name, ProfileImage: window.localStorage.getItem('myRes') }).then((res) => {
            if (res.data.status === 200) {
                setLoading(false);
                setTimeout(() => {
                    push("/");
                }, 1000);
            }
        }).catch((err) => {
            console.log(err.response.data);
            setLoading(false);
        })
    }
    return (
        <div className="container mb-10">
            <Card className="w-[350px] m-auto mt-20">
                <CardHeader className="text-center" >
                    <CardTitle>Sign Up Page</CardTitle>
                    <CardDescription>Please enter your account info to log in .</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4">
                        <SingleImageDropzoneUsage />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" placeholder="name" required onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between mt-10">
                            <div className="w-full">
                                {loading ? <ButtonLoading /> : <Button className="w-full" >Log In</Button>}
                            </div>
                        </CardFooter>
                    </form>

                    <CardFooter>
                        <div className="text-center">
                            <p>I already have an account <Link href="/login" className="text-blue-500">Log In</Link></p>
                        </div>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}
