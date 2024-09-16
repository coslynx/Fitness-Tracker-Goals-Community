"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth/next";
import { z } from "zod";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const progress = await prisma.progress.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        goal: {
          select: {
            id: true,
            name: true,
            targetValue: true,
          },
        },
      },
    });

    if (!progress) {
      return new Response(JSON.stringify({ error: "Progress not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(progress), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();

    const schema = z.object({
      value: z.number().int(),
      date: z.date(),
    });

    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error.issues }), { status: 422 });
    }

    const progress = await prisma.progress.create({
      data: {
        goalId: parseInt(params.id),
        userId: session.user.id,
        ...parsedBody.data,
      },
    });

    return new Response(JSON.stringify(progress), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await req.json();

    const schema = z.object({
      value: z.number().int().optional(),
      date: z.date().optional(),
    });

    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error.issues }), { status: 422 });
    }

    const progress = await prisma.progress.update({
      where: { id: parseInt(params.id) },
      data: {
        ...parsedBody.data,
      },
    });

    return new Response(JSON.stringify(progress), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(auth);
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const progress = await prisma.progress.delete({
      where: { id: parseInt(params.id) },
    });

    return new Response(JSON.stringify({ message: "Progress deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}