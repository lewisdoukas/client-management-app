import { NextRequest, NextResponse } from "next/server";
import { caseSchema } from "@/app/validationSchemas";
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
  const validation = caseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const { title, description, status, clientId } = validation.data;

  const existingCase = await prisma.case.findUnique({
    where: { id: params.id },
  });

  if (!existingCase) {
    return NextResponse.json({ error: "Invalid case" }, { status: 404 });
  }

  const updatedCase = await prisma.case.update({
    where: {
      id: existingCase.id,
    },
    data: {
      title,
      description,
      status,
      clientId,
    },
  });

  return NextResponse.json(updatedCase);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({}, { status: 401 });
  }

  const existingCase = await prisma.case.findUnique({
    where: { id: params.id },
  });

  if (!existingCase) {
    return NextResponse.json({ error: "Invalid case" }, { status: 404 });
  }

  await prisma.case.delete({
    where: {
      id: existingCase.id,
    },
  });

  return NextResponse.json({});
}
