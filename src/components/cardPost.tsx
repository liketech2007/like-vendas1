"use client"
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button
} from "@material-tailwind/react";
import Link from "next/link";
interface ICardPost {
  namefunctionary: string;
  product: string;
  price: string;
  link: string;
  date: string;
}

export function CardPost({ namefunctionary,product,price,link,date}: ICardPost) {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {namefunctionary}
        </Typography>
        <Typography>
          Vendeu o produto ou serviço {product} no valor de {price}
        </Typography>
        <Typography>
          Data: {date}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Link href={link}>
          <Button>Ver mias</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}