import PostList from '@/components/posts/PostList';

export default function HomePage() {
  return <>
    <div className="container mx-auto py-4 md:py-8 px-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 md:mb-8">Homepage</h1>
    </div>
    <PostList />
  </>;
}
