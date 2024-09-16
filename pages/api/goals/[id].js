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

    const goal = await prisma.goal.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        user: {
          select: {
            id: true,
          },
        },
        progress: true,
      },
    });

    if (!goal || goal.userId !== session.user.id) {
      return new Response(JSON.stringify({ error: "Goal not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(goal), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.issues }), { status: 422 });
    }
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
      name: z.string().min(1),
      targetValue: z.number().int(),
      targetDate: z.date(),
    });

    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error.issues }), { status: 422 });
    }

    const goal = await prisma.goal.update({
      where: { id: parseInt(params.id) },
      data: {
        ...parsedBody.data,
      },
    });

    if (!goal || goal.userId !== session.user.id) {
      return new Response(JSON.stringify({ error: "Goal not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(goal), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.issues }), { status: 422 });
    }
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

    const goal = await prisma.goal.delete({
      where: { id: parseInt(params.id) },
    });

    if (!goal || goal.userId !== session.user.id) {
      return new Response(JSON.stringify({ error: "Goal not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Goal deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}