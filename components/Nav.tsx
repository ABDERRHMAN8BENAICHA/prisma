import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { decodeToken, getCookie } from "@/lib";
import Logout from "./Logout";
import ModeToggle from "./ModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cookies } from "next/headers";
import { MydecodedToken } from "@/app/profile/page";


export default function Nav() {
    const token: string | undefined = cookies().get("token")?.value;
    const mydecodedToken: MydecodedToken = decodeToken(token ?? "") as MydecodedToken;
    const trimmedUrl = mydecodedToken?.ProfileImage?.substring(1, mydecodedToken.ProfileImage.length - 1);
    const cook = getCookie("token");
    return (
        <nav className="h-auto  flex justify-between items-center p-4 fixed border-b w-full  backdrop-blur-md top-0 left-0 z-50 shadow-lg">
            <div>
                {/* <Link href="/">
                    <h1 className="text-2xl font-bold 
                        hover:text-sky-600
                        transition-all
                        duration-300" >Kiraa <span className="text-sky-600  font-bold text-3xl">.</span></h1>
                </Link> */}
                <Link href={"/"}>
                <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" className="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" className="ccustom" fill="#312ECB"></path> </svg>
                </Link>
            </div>
            <div>
                <ul className="flex space-x-4 items-center">
                    <li>
                        <Link className="
                        font-semibold
                        hover:text-sky-600
                        transition-all
                        duration-300
                        " href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="
                        font-semibold
                        hover:text-sky-600
                        transition-all
                        duration-300
                        "  href="/products">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link className="
                        font-semibold
                        hover:text-sky-600
                        transition-all
                        duration-300
                        "  href="/contact-us">
                            Contact Us
                        </Link>
                    </li>
                    {
                        cook ? (
                            <>
                                <li>
                                </li>
                                <li>
                                    <Link className="
                        font-semibold
                        hover:text-sky-600
                        transition-all
                        duration-300
                        " href="/profile">
                                        <Avatar>
                                            <AvatarImage src={trimmedUrl} alt="@shadcn" />
                                            <AvatarFallback>
                                                {
                                                    mydecodedToken.email.charAt(0).toUpperCase()
                                                }
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login">
                                        <Button>Login</Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/signup">
                                        <Button>Register</Button>
                                    </Link>
                                </li>
                            </>
                        )
                    }

                    <li>
                        <ModeToggle />
                    </li>
                </ul>
            </div>
        </nav>
    )
}