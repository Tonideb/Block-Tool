import Link from "next/link";

type BlockType = "heading" | "paragraph" | "numberedListItem" | "checkListItem" | "image" | string;

interface ContentBlock {
  id: string;
  type: BlockType;
  props: {
    level?: number;
    url?: string;
    caption?: string;
    checked?: boolean;
    [key: string]: unknown;
  };
  content: Array<{
    text?: string;
    type?: string;
    styles?: Record<string, unknown>;
  }>;
  children: ContentBlock[];
}

interface BlogPost {
  id: number;
  title: string;
  content: ContentBlock[];
  createdAt: string;
  updatedAt: string;
}

async function fetchBlogPost(id: number): Promise<BlogPost> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiUrl) {
    throw new Error("API base URL is not configured");
  }

  const res = await fetch(`${apiUrl}/posts/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }
  return res.json();
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  let post: BlogPost | null = null;

  try {
    post = await fetchBlogPost(Number(params.id));
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-red-500">
            Error loading blog post. Please try again later.
          </div>
          <Link href="/blogs" className="text-blue-500 mt-4 inline-block">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div>Blog post not found</div>
          <Link href="/blogs" className="text-blue-500 mt-4 inline-block">
            ← Back to all blogs
          </Link>
        </div>
      </div>
    );
  }

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "heading":
        const HeadingTag = `h${block.props.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag className="my-4">
            {block.content.map((item, i) => (
              <span key={i}>{item.text}</span>
            ))}
          </HeadingTag>
        );
        
      case "paragraph":
        return (
          <p className="my-2">
            {block.content.map((item, i) => (
              <span key={i}>{item.text}</span>
            ))}
          </p>
        );
        
      case "numberedListItem":
        return (
          <li className="ml-6 list-decimal">
            {block.content.map((item, i) => (
              <span key={i}>{item.text}</span>
            ))}
          </li>
        );
        
      case "checkListItem":
        return (
          <div className="flex items-center my-2">
            <input 
              type="checkbox" 
              checked={block.props.checked} 
              readOnly
              className="mr-2"
            />
            <span>
              {block.content.map((item, i) => (
                <span key={i}>{item.text}</span>
              ))}
            </span>
          </div>
        );
        
      case "image":
        return (
          <div className="my-4">
            {/* Using Next.js Image component for optimization */}
            <img
              src={block.props.url}
              alt={block.props.caption || "Blog image"}
              className="max-w-full h-auto rounded-lg"
            />
            {block.props.caption && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {block.props.caption}
              </p>
            )}
          </div>
        );
        
      default:
        console.warn(`Unknown block type: ${block.type}`);
        return (
          <div className="my-2">
            {block.content.map((item, i) => (
              <span key={i}>{item.text}</span>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blogs" className="text-blue-500 mb-4 inline-block">
          ← Back to all blogs
        </Link>

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

        <div className="text-sm text-gray-500 mb-6">
          Created: {new Date(post.createdAt).toLocaleString()} | Last updated:{" "}
          {new Date(post.updatedAt).toLocaleString()}
        </div>

        <div className="prose max-w-none">
          {post.content.map((block) => (
            <div key={block.id}>
              {renderContentBlock(block)}
              {block.children.length > 0 && (
                <div className="ml-4">
                  {block.children.map((child) => (
                    <div key={child.id}>{renderContentBlock(child)}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={`/blogs/${post.id}/edit`}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Edit Post
          </Link>
        </div>
      </div>
    </div>
  );
}
