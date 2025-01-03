import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useMemo } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt?: Date;
};

type SortOption = {
  label: string;
  value: string;
  compareFn: (a: Post, b: Post) => number;
};

type PostGridProps = {
  posts: Post[];
  initialSort?: string;
};

const sortOptions: SortOption[] = [
  {
    label: "Newest First",
    value: "newest",
    compareFn: (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  },
  {
    label: "Oldest First",
    value: "oldest",
    compareFn: (a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime()
  },
  {
    label: "Title (A-Z)",
    value: "title-asc",
    compareFn: (a, b) => a.title.localeCompare(b.title)
  },
  {
    label: "Title (Z-A)",
    value: "title-desc",
    compareFn: (a, b) => b.title.localeCompare(a.title)
  }
];

export function PostGrid({ posts, initialSort = "newest" }: PostGridProps) {
  const [sortBy, setSortBy] = useState(initialSort);

  const sortedPosts = useMemo(() => {
    const sorter = sortOptions.find(option => option.value === sortBy);
    if (!sorter) return posts;
    return [...posts].sort(sorter.compareFn);
  }, [posts, sortBy]);

  return (
    <div className="space-y-4 px-4 md:px-0">
      <div className="flex justify-end">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {sortedPosts.length > 0 ? (
        sortedPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{post.content}</p>
              {post.createdAt && (
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            No posts found.
          </CardContent>
        </Card>
      )}
    </div>
  );
} 