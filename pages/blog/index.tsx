import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import type { BlogMeta } from "@/lib/blog";

type BlogIndexProps = {
  posts: BlogMeta[];
};

export default function BlogIndexPage({ posts }: BlogIndexProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-extrabold mb-10 tracking-tight">All Blogs</h1>
      <div className="grid gap-10 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group border rounded-2xl shadow-sm hover:shadow-lg transition bg-white flex flex-col overflow-hidden"
          >
            <div className="relative h-52 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition rounded-t-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
              />
            </div>
            <div className="flex-1 p-6 flex flex-col gap-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 mb-1">{post.category}</span>
              <h2 className="text-xl font-bold group-hover:underline">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{post.description}</p>
              <span className="text-xs text-gray-400 mt-auto">
                {format(new Date(post.date), "dd MMM yyyy")}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Data fetching (works with Next.js Pages Router)
import { getAllPosts } from "@/lib/blog";
export const getStaticProps: GetStaticProps = async () => {
  const posts = getAllPosts();
  return {
    props: { posts },
  };
};
