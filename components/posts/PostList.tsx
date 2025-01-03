'use client';

import { useState, useEffect } from 'react';
import { PostForm } from './PostForm';
import { PostGrid } from './PostGrid';

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await fetch('/api/posts', { method: 'GET' }); 
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  }

  function handlePostCreated(newPost: Post) {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  }

  return (
    <div className="container mx-auto py-4 md:py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Posts</h1>
      <PostForm onPostCreated={handlePostCreated} />
      <PostGrid posts={posts} initialSort="newest" />
    </div>
  );
} 