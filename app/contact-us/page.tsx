import Heading from "@/components/Heading";
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
import { Textarea } from "@/components/ui/textarea"

export default function Page() {
    return (
        <>
            <div className=" flex justify-center items-center relative mt-20">
                <div className="border rounded-md w-full h-auto">
                    <Heading title="Contact Us " isCentered={true} />
                    <form className="flex flex-col space-y-3 w-full p-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input type="text" id="name" placeholder="Name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" placeholder="Email" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="message">Message</Label>
                            <Textarea className="border p-2 rounded-md" id="message" placeholder="Message" />
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>

                </div>
            </div>
        </>
    )
}