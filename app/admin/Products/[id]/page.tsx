"use client"
import { useEffect, useState } from "react"
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
import { ButtonLoading } from "@/app/login/page"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { SingleImageDropzoneUsage } from "@/components/SingleImageDropzoneUsage"
import axios from "axios"
import { ProductInfoType } from "@/app/products/[idProduct]/page"
type Props = {
    params: {
        id: string
    }
}

export default function Page({ params }: Props) {
    const id = params.id as string;
    const [product, setProduct] = useState<ProductInfoType>();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.post('http://localhost:3000/api/products/get-product', {
                    id: id
                });
                setProduct(response.data.body);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])
    console.log(product);
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [type, setType] = useState<string>("")
    const [evaluation, setEvaluation] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const { push } = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        axios.patch("http://localhost:3000/api/products/update", { id, title, description, type, evaluation, price, ProfileImage: window.localStorage.getItem('myRes') }).then((res) => {
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
        <>
            <div className="container mb-10">
                <Card className="w-[350px] m-auto mt-20">
                    <CardHeader className="text-center" >
                        <CardTitle>Update Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4">
                            <SingleImageDropzoneUsage />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="title">Title</Label>
                                    <Input defaultValue={product?.title} type="text" id="title" placeholder="title" required onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="description">Description</Label>
                                    <Input defaultValue={product?.description} type="text" id="description" placeholder="description" required onChange={(e) => setDescription(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="type">Type</Label>
                                    <Input defaultValue={product?.type} type="text" id="type" placeholder="type" required onChange={(e) => setType(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="evaluation">Evaluation</Label>
                                    <Input defaultValue={product?.evaluation} type="number" id="evaluation" placeholder="evaluation" required onChange={(e) => setEvaluation(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="price">Price</Label>
                                    <Input defaultValue={product?.price} type="number" id="price" placeholder="price" required onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <CardFooter className="flex justify-between mt-10">
                                <div className="w-full">
                                    {loading ? <ButtonLoading /> : <div className="flex justify-center items-center gap-4"><Button>Update</Button> <Link href={`/admin/owners`}> <Button variant="destructive">Cancel</Button></Link></div>}
                                </div>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}