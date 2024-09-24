import { caseSchema } from "@/app/validationSchemas";
import { auth } from "@/auth";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session || !session.user.isAdmin) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();

  const validation = caseSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const client = await prisma.client.findUnique({
    where: { id: body.clientId },
  });

  if (!client) {
    return NextResponse.json({ error: "Invalid client" }, { status: 404 });
  }

  const { title, description, status, clientId } = validation.data;

  const newCase = await prisma.case.create({
    data: {
      title,
      description,
      status,
      clientId,
    },
  });

  return NextResponse.json(newCase, { status: 201 });
}
