"use client"
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from 'axios'
import { ProductType } from '@/components/CardProduct'
import { ProductInfoType } from '@/app/products/[idProduct]/page'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type Props = {}


export default async function page({ }: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [products, setProducts] = useState<ProductInfoType[] | null>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/api/products")
      setProducts(response.data.body)
    }
    fetchData()
  }, [])
  const handleDeleteProduct = async (idProduct : string) => {
    console.log(idProduct);
    // const response = await axios.delete("http://localhost:3000/api/products", { idProduct })
    // setProducts(response.data.body)
  }
  console.log(products);
  return (
    <>
      <Table>
        <TableCaption>A list of your products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product: ProductInfoType) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.title}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.owner.name}</TableCell>
              <TableCell><Link href={`products/${product.id}`}><Button>Edit</Button></Link></TableCell>
              <TableCell><Link  href={``}>
                <Button onClick={()=> handleDeleteProduct(product.id)} variant="destructive">Delete</Button>
              </Link></TableCell>
              <TableCell>{product.owner.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}