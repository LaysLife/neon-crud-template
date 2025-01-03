import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Handle GET requests
export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts, { status: 200 });
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const { title, content } = body;

  if (!title || !content) {
    return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
  }

  const newPost = await prisma.post.create({
    data: { title, content },
  });
  return NextResponse.json(newPost, { status: 201 });
}
