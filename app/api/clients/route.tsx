import { NextRequest, NextResponse } from "next/server";
import { clientSchema } from "../../validationSchemas";
import { prisma } from "@/prisma/client";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = clientSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { firstname, lastname, phoneNumber, email, address } = validation.data;

  const newClient = await prisma.client.create({
    data: {
      firstname,
      lastname,
      phoneNumber,
      email,
      address,
    },
  });

  return NextResponse.json(newClient, { status: 201 });
}
