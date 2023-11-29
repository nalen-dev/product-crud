import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db.product.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json("ok");
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { data } = await req.json();

  try {
    await db.product.update({
      where: { id: parseInt(params.id) },
      data: {
        name: data.name,
        quantity: parseInt(data.quantity),
        price: parseInt(data.price),
        description: data.description,
      },
    });

    return NextResponse.json("ok");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
