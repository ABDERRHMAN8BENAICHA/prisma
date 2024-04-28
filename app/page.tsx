"use client"
import CardProduct, { ProductType } from "@/components/CardProduct";
import CarouselDApiDemo from "@/components/CarouselDApiDemo";
import Container from "@/components/Container";
import ContainerProducts from "@/components/ContainerProducts";
import Nav from "@/components/Nav";
import { decodeToken, isTokenExpired } from "@/lib";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data.body);
        console.log(products);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  },[]);
  return (
    <main>
      <ContainerProducts>
        <div className="w-full">
          <h1 className="text-3xl font-bold text-center mt-10 m-auto">Products</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            products.length === 0 ? <h1 className="text-red-500">
              product not found
            </h1> :
              products?.map((product : ProductType) => (
                <CardProduct key={product.id} {...product} />
              ))
          }
        </div>
      </ContainerProducts>
    </main>
  );
}
