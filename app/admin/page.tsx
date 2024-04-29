import Heading from "@/components/Heading"
import { Award, MousePointerSquareDashed, Users } from "lucide-react"
import Link from "next/link"

export default function Page() {
    return (
        <>
            <Heading title="Admin Dashboard" isCentered={true} />
            <div className="flex flex-col gap-10">
                <div className="flex justify-center gap-10 items-center w-full">
                    <Link href={"admin/users"}>
                        <div className="w-[250px] h-[130px] border rounded-md flex flex-col justify-center items-center gap-2">
                            <h2 className="text-xl font-bold">Users</h2>
                            <Users />
                        </div>
                    </Link>
                    <Link href={"admin/products"}>
                        <div className="w-[250px] h-[130px] border rounded-md flex flex-col justify-center items-center  gap-2">
                            <h2 className="text-xl font-bold">Products</h2>
                            <MousePointerSquareDashed />
                        </div>
                    </Link>
                    <Link href={"admin/owners"}>
                        <div className="w-[250px] h-[130px] border rounded-md flex flex-col justify-center items-center  gap-2">
                            <h2 className="text-xl font-bold">Owners</h2>
                            <Award />
                        </div>
                    </Link>

                </div>
            </div>
        </>
    )
}