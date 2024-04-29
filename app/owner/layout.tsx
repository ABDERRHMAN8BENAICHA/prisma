import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { decodeToken, getCookie } from "@/lib";
import { JwtPayload } from "jsonwebtoken";
import Link from "next/link";


export default function Layout({ children }: { children: React.ReactNode }) {
    const cook = getCookie("token");
    const token = decodeToken(cook ?? "");
    console.log((token as JwtPayload)?.role);
    if (!cook) {
        return (
            <>
                <Heading title="You are not authorized to access this page" isCentered={true} />
                <div className="w-full flex justify-center items-center ">
                    <Link href="/">
                        <Button >
                            Go Back
                        </Button>
                    </Link>
                </div>
            </>
        );
    }
    if ((token as JwtPayload)?.role !== "OWNER") {
        return (
            <>
                <Heading title="You are not authorized to access this page" isCentered={true} />
                <div className="w-full flex justify-center items-center ">
                    <Link href="/">
                        <Button >
                            Go Back
                        </Button>
                    </Link>
                </div>
            </>
        )
    }
    return (
        <div>
            {children}
        </div>
    )
}