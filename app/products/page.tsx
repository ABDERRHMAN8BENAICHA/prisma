"use client"
import CardProduct, { ProductType } from "@/components/CardProduct";
import ContainerProducts from "@/components/ContainerProducts";
import Heading from "@/components/Heading";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// export function Search() {
//     return (
//         <div className="flex w-full max-w-sm items-center space-x-2">
//             <Input type="email" placeholder="Search..." />
//             <Button type="submit">Search</Button>
//         </div>
//     )
// }

export default function Page() {
    const [search , setSearch] = useState('');
    const [products, setProducts] = useState<ProductType[]>([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data.body);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[]);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/products/search`, {search});
            setProducts(response.data.body.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <>
        <div className="flex flex-col w-full">
            <Heading title="Search any product" isCentered={true} />
            <div className="w-full mt-4 flex justify-center items-center">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="text" placeholder="Search..." onChange={(e)=> setSearch(e.target.value)} />
                    <Button type="submit">Search</Button>
                </form>
            </div>
        </div>
        </div>
        <ContainerProducts>
            {
                products.length === 0 ? (
                <div className="mx-10  flex space-x-20 mt-10 justify-between items-center">
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[325px] w-[320px] rounded-xl" />
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[325px] w-[320px] rounded-xl" />
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
                <div className="flex flex-col space-y-3">
                    <Skeleton className="h-[325px] w-[320px] rounded-xl" />
                    <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
                </div>
                ):
                products?.map((product) => (
                    <CardProduct key={product.id} {...product} />
                ))
            }
        </ContainerProducts>
        </>
    )
}


// export async function getAllProducts(){
//     const res = await fetch('http://localhost:3000/api/products/').then(res => res.json());
//     return res;
// }



// "use client"
// import { useEffect, useState } from 'react';
// import CardProduct from "@/components/CardProduct";
// import ContainerProducts from "@/components/ContainerProducts";
// import axios from "axios";

// export default function Page() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/products');
//                 console.log(response.data.body);
                
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         }

//         fetchData();
//     }, []);

//     return (
//         <ContainerProducts>
//             {
//                 products?.map((product) => (
//                     <CardProduct key={product.id} {...product} />
//                 ))
//             }
//         </ContainerProducts>
//     );
// }
