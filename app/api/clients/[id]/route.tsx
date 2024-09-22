import { NextRequest, NextResponse } from "next/server";
import { clientSchema, caseSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import { prisma } from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client) {
    return NextResponse.json({ error: "Invalid client" }, { status: 404 });
  }

  const updatedClient = await prisma.client.update({
    where: {
      id: client.id,
    },
    data: {
      firstname,
      lastname,
      phoneNumber,
      email,
      address,
    },
  });

  return NextResponse.json(updatedClient);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({}, { status: 401 });
  }

  const client = await prisma.client.findUnique({
    where: { id: params.id },
  });

  if (!client) {
    return NextResponse.json({ error: "Invalid client" }, { status: 404 });
  }

  await prisma.client.delete({
    where: {
      id: client.id,
    },
  });

  return NextResponse.json({});
}

// To create a case
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = caseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { title, description } = validation.data;

  const newCase = await prisma.case.create({
    data: {
      title,
      description,
      clientId: params.id,
    },
  });

  return NextResponse.json(newCase, { status: 201 });
}
