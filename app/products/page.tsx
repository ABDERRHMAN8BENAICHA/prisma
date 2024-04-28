"use client"
import CardProduct, { ProductType } from "@/components/CardProduct";
import ContainerProducts from "@/components/ContainerProducts";
import axios from "axios";
import { useEffect, useState } from "react";




export default function Page() {
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
    console.log(products);
    return (
        <ContainerProducts>
            {
                products.length === 0 ? <h1>
                    product not found
                </h1> :
                products?.map((product) => (
                    <CardProduct key={product.id} {...product} />
                ))
            }
        </ContainerProducts>
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
