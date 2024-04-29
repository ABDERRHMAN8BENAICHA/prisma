"use client"
import CardProduct, { ProductType } from "@/components/CardProduct";
import CarouselDApiDemo from "@/components/CarouselDApiDemo";
import Container from "@/components/Container";
import ContainerProducts from "@/components/ContainerProducts";
import Heading from "@/components/Heading";
import Nav from "@/components/Nav";
import { Skeleton } from "@/components/ui/skeleton";
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
  }, []);
  return (
    <main>
      <ContainerProducts>
        <div className="w-full">
          <Heading title="Products" isCentered={true} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            products.length === 0 ? (
              <div className="mx-10 flex space-x-20 mt-10 justify-between items-center">
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
            ) :
              products?.map((product: ProductType) => (
                <CardProduct key={product.id} {...product} />
              ))
          }
        </div>
      </ContainerProducts>
    </main>
  );
}
