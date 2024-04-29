import Heading from "@/components/Heading"
import { Award, MousePointerSquareDashed, ScanBarcode, Users } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function Page() {
    return (
        <>
            <Heading title="Admin Dashboard" isCentered={true} />
            <div className="flex justify-center items-center gap-10 pt-10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-[250px] h-[130px] border rounded-md flex flex-col justify-center items-center  gap-2">
                            <h2 className="text-xl font-bold">Owners</h2>
                            <Users />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Users Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="top">
                                <Link href="/admin/users">
                                    <div className="flex items-center gap-2">
                                        <Users />
                                        <span>View Users</span>
                                    </div>
                                </Link>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">
                                <Link href="/admin/owners/create">
                                    <div className="flex items-center gap-2">
                                        <MousePointerSquareDashed />
                                        <span>Create Users</span>
                                    </div>
                                </Link>
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-[250px] h-[130px] border rounded-md flex flex-col justify-center items-center  gap-2">
                            <h2 className="text-xl font-bold">Owners</h2>
                            <Award />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Owner  Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="top">
                                <Link href="/admin/owners">
                                    <div className="flex items-center gap-2">
                                        <Users />
                                        <span>View Owners</span>
                                    </div>
                                </Link>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">
                                <Link href="/admin/owners/create">
                                    <div className="flex items-center gap-2">
                                        <MousePointerSquareDashed />
                                        <span>Create Owner</span>
                                    </div>
                                </Link>
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="w-[250px] h-[130px] border rounded-md flex flex-col justify-center items-center  gap-2">
                            <h2 className="text-xl font-bold">Products</h2>
                            <ScanBarcode />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Products  Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup>
                            <DropdownMenuRadioItem value="top">
                                <Link href="/admin/products">
                                    <div className="flex items-center gap-2">
                                        <Users />
                                        <span>View Products</span>
                                    </div>
                                </Link>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="bottom">
                                <Link href="/admin/products/create">
                                    <div className="flex items-center gap-2">
                                        <MousePointerSquareDashed />
                                        <span>Create Products</span>
                                    </div>
                                </Link>
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}