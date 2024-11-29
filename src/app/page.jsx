"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


export default function Home() {
  const [mounted, setMounted] = useState(false)

  const featuredPosts = [
    {
      title: "Getting Started with Next.js",
      excerpt: "Learn the basics of Next.js and start building awesome apps.",
      author: "Jane Doe",
      date: "June 1, 2023"
    },
    {
      title: "The Power of React Hooks",
      excerpt: "Discover how React Hooks can simplify your component logic.",
      author: "John Smith",
      date: "June 5, 2023"
    },
    {
      title: "Mastering CSS Grid",
      excerpt: "Take your layouts to the next level with CSS Grid.",
      author: "Alice Johnson",
      date: "June 10, 2023"
    }
  ]


  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-4">
          Welcome to BlogApp
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover insightful articles, share your knowledge, and engage with a community of passionate writers and readers.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/blog">
            <Button size="lg">Explore Blogs</Button>
          </Link>
          <Link href="/create">
            <Button size="lg" variant="outline">Start Writing</Button>
          </Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  By {post.author} on {post.date}
                </div>
                <Link href={`/blog/${index + 1}`}>
                  <Button variant="ghost">Read More</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with like-minded individuals, share your stories, and grow together.
        </p>
        <Link href="/signup">
          <Button size="lg">Sign Up Now</Button>
        </Link>
      </section>
    </div>
  );
}
