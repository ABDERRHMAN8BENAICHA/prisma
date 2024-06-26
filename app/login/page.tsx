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
import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
export function ButtonLoading() {
    return (
        <Button disabled className="w-full">
            <ReloadIcon className={`mr-2 h-4 w-4 animate-spin `} />
            Please wait
        </Button>
    )
}
export default function LoginPage() {
    const {push} = useRouter(); 
    const [loading , setLoading] = useState<boolean>(false);
    const [error , setError] = useState<string | null>(null);
    const [email , setEmail] = useState<string>("")
    const [password , setPassword] = useState<string>("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        axios.post("/api/auth/login" , {email , password}).then((res) => {
            if(res.data.status === 200){
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
        <div className="container">
            <Card className="w-[350px] m-auto mt-20">
                <CardHeader className="text-center" >
                    <CardTitle>Log In Page</CardTitle>
                    <CardDescription>Please enter your account info to log in .</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="password"  onChange={(e)=> setPassword(e.target.value)} />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between mt-10">
                            <div className="w-full">
                                {loading ? <ButtonLoading /> : <Button className="w-full" >Log In</Button>}
                            </div>
                        </CardFooter>
                    </form>
                    <CardFooter>
                    <p>Don t have an account ? <Link href="/signup" className="text-blue-500">Sign Up</Link></p>
                    </CardFooter>
                </CardContent>
            </Card>
        </div>
    )
}