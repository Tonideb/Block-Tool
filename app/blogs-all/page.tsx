import Link from 'next/link';

interface BlogPost {
  id: number;
  title: string;
  content: any[];
  createdAt: string;
  updatedAt: string;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('http://localhost:3005/posts');
  if (!res.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return res.json();
}

export default async function AllBlogs() {
  let posts: BlogPost[] = [];
  
  try {
    posts = await fetchBlogPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div>Error loading blog posts. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="text-2xl font-bold">All blogs</header>
      
      <main className="w-full max-w-4xl">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">No blog posts found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blogs-all/${post.id}`} 
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-sm text-gray-500 mt-2">
                  Created: {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}