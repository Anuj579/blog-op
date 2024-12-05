"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/BlogCard";
import { ArrowRight, Calendar, Clock, Loader2, PlusCircle } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession()
  const featuredPosts = [
    { id: 1, title: "10 Tips for Better Coding", excerpt: "Improve your coding skills with these essential tips.", author: "Jane Doe", date: "2023-07-01", comments: 15, readTime: 5, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, title: "The Future of Web Development", excerpt: "Explore upcoming trends in web development.", author: "John Smith", date: "2023-07-05", comments: 8, readTime: 7, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, title: "Mastering React Hooks", excerpt: "Take your React skills to the next level with Hooks.", author: "Alice Johnson", date: "2023-07-10", comments: 23, readTime: 6, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
  ]

  const recentPosts = [
    { id: 4, title: "My Journey with Next.js", date: "2023-07-15", readTime: 8 },
    { id: 5, title: "Understanding TypeScript Generics", date: "2023-07-12", readTime: 6 },
    { id: 6, title: "CSS Grid vs Flexbox: When to Use Which?", date: "2023-07-08", readTime: 5 },
  ]

  if (status === "loading")
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    )
  return (
    <div className="container mx-auto px-4 py-12">
      {session ?
        <>
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome back, John!</h1>
            <p className="text-xl text-muted-foreground mb-6">Ready to share your thoughts with the world?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blogs/create-blog" className="w-full sm:w-auto">
                <Button size="lg" className='w-full sm:w-auto'>
                  <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button size="lg" className='w-full sm:w-auto' variant="outline">Go to Dashboard</Button>
              </Link>
            </div>
          </section>
          <section className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-semibold">Your Recent Posts</h2>
              <Link href="/dashboard">
                <Button variant="link">
                  View all <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {post.readTime} min read
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </>
        :
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-4">
            Welcome to BlogApp
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover insightful articles, share your knowledge, and engage with a community of passionate writers and readers.
          </p>
          <div>
            <Link href="/blogs">
              <Button size="lg">Explore Blogs</Button>
            </Link>
          </div>
        </section>
      }

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8">Featured Posts</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {!session &&
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create your own blog, share your thoughts, and receive feedback from readers. Start your writing journey today!
          </p>
          <Link href="/auth/signup">
            <Button size="lg">Sign Up Now</Button>
          </Link>
        </section>
      }
    </div>
  );
}
