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

    const post = await prisma.post.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            user: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!post) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(post), { status: 200 });
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
      content: z.string().min(1),
    });

    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error.issues }), { status: 422 });
    }

    const comment = await prisma.comment.create({
      data: {
        postId: parseInt(params.id),
        userId: session.user.id,
        content: parsedBody.data.content,
      },
    });

    return new Response(JSON.stringify(comment), { status: 201 });
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
      content: z.string().min(1).optional(),
    });

    const parsedBody = schema.safeParse(body);

    if (!parsedBody.success) {
      return new Response(JSON.stringify({ error: parsedBody.error.issues }), { status: 422 });
    }

    const post = await prisma.post.update({
      where: { id: parseInt(params.id) },
      data: {
        ...parsedBody.data,
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
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

    const post = await prisma.post.delete({
      where: { id: parseInt(params.id) },
    });

    return new Response(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}