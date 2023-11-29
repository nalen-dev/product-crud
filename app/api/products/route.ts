import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const products = await db.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(req: Request) {
  try {
    const { data } = await req.json();
    await db.product.create({
      data: {
        name: data.name,
        quantity: parseInt(data.quantity),
        price: parseInt(data.price),
        description: data.description,
      },
    });

    return NextResponse.json("ok");
  } catch (error) {
    return NextResponse.json(error);
  }
}
