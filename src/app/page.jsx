
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/BlogCard";


export default function Home() {

  const featuredPosts = [
    { id: 1, title: "10 Tips for Better Coding", excerpt: "Improve your coding skills with these essential tips.", author: "Jane Doe", date: "2023-07-01", comments: 15, readTime: 5, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, title: "The Future of Web Development", excerpt: "Explore upcoming trends in web development.", author: "John Smith", date: "2023-07-05", comments: 8, readTime: 7, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, title: "Mastering React Hooks", excerpt: "Take your React skills to the next level with Hooks.", author: "Alice Johnson", date: "2023-07-10", comments: 23, readTime: 6, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-4">
          Welcome to BlogApp
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover insightful articles, share your knowledge, and engage with a community of passionate writers and readers.
        </p>
        <div>
          <Link href="/blog">
            <Button size="lg">Explore Blogs</Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Featured Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Create your own blog, share your thoughts, and receive feedback from readers. Start your writing journey today!
        </p>
        <Link href="/auth/signup">
          <Button size="lg">Sign Up Now</Button>
        </Link>
      </section>
    </div>
  );
}
