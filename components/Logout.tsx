"use client"
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function Logout() {
    const {push} = useRouter(); 
    return (
        <Button variant="destructive" onClick={async () => {
            await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            push("/login")
        }}>Logout</Button>
    )
}