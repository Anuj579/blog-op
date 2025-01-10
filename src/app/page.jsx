"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/BlogCard";
import { ArrowRight, Calendar, Clock, Loader2, PlusCircle } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";

export default function Home() {
  const { data: session, status } = useSession()
  const [yourRecentPosts, setYourRecentPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      const fetchRecentPosts = async () => {
        setLoading(true)
        try {
          const res = await fetch(`/api/blog?author=${session.user.id}`)
          const data = await res.json()
          if (data.success) {
            setYourRecentPosts(data.blogs)
          } else {
            console.log("Error fetching user posts:", data.error);
          }
        } catch (error) {
          console.error("Error fetching blogs:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchRecentPosts()
    } else {
      setLoading(false)
    }
  }, []) // include session in dependency array if needed

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/blog/list', {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json()
        setFeaturedPosts(data.blogs)
      } catch (error) {
        console.error("Error fetching featured posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (status === "loading" || loading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-11rem)]">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    )
  return (
    <div className="container mx-auto px-4 py-12">
      {session ?
        <>
          <section className="mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome, {session.user.name.split(' ')[0].charAt(0).toUpperCase() + session.user.name.split(' ')[0].slice(1)}!</h1>
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

          {/* Your Recent Posts */}
          {yourRecentPosts.length > 0 && (
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
                {yourRecentPosts.slice(0, 3).map((post) => (
                  <Card key={post._id}>
                    <CardHeader>
                      <CardTitle>
                        <Link href={`/blog/${post._id}`} className="hover:underline">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {formatDate(post.updatedAt)}
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
          )}
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

      <section>
        <h2 className="text-3xl font-semibold mb-8">Featured Posts</h2>
        {featuredPosts.length === 0 && (<p>There are no blogs found.</p>)}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.length > 0 && featuredPosts.slice(0, 3).map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </section>

      {!session &&
        <section className="text-center mt-14">
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
