"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/BlogCard";
import { ArrowRight, Calendar, Clock, PlusCircle, RotateCwIcon } from "lucide-react";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import formatDate from "@/utils/formatDate";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import SkeletonCard from "@/components/SkeletonCard";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: session } = useSession()
  const [yourRecentPosts, setYourRecentPosts] = useState([])
  const [featuredPosts, setFeaturedPosts] = useState([])
  const [loadingRecentPosts, setLoadingRecentPosts] = useState(true)
  const [errorFetchingRecentPosts, setErrorFetchingRecentPosts] = useState(false)
  const [loadingLatestPosts, setLoadingLatestPosts] = useState(true)
  const [errorFetchingLatestPosts, setErrorFetchingLatestPosts] = useState(false)

  const fetchRecentPosts = async () => {
    setLoadingRecentPosts(true)
    setErrorFetchingRecentPosts(false)
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const res = await fetch(`/api/blog?author=${session.user.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        cache: 'no-store',
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        setYourRecentPosts(data.blogs)
      } else {
        setErrorFetchingRecentPosts(true)
        console.log("Error fetching user posts:", data.error);
      }
    } catch (error) {
      console.error("Error fetching user's recent blogs:", error)
    } finally {
      setLoadingRecentPosts(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchRecentPosts()
    } else {
      setLoadingRecentPosts(false)
    }
  }, []) // include session in dependency array if needed

  const fetchLatestPosts = async () => {
    setLoadingLatestPosts(true)
    setErrorFetchingLatestPosts(false)
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const res = await fetch('/api/blog/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      })
      const data = await res.json()
      if (data.success) {
        setFeaturedPosts(data.blogs)
      } else {
        setErrorFetchingLatestPosts(true)
        console.log("Error fetching posts:", data.error);
      }
    } catch (error) {
      console.error("Error fetching featured posts:", error)
    } finally {
      setLoadingLatestPosts(false)
    }
  }

  useEffect(() => {
    fetchLatestPosts()
  }, [])

  return (
    <div className="mx-auto">
      {session ?
        <>
          <section className="my-12 mb-16 max-[1440px]:px-4 container">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome, {session.user.name.split(' ')[0].charAt(0).toUpperCase() + session.user.name.split(' ')[0].slice(1)}!</h1>
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
          <section className="mb-16 max-[1440px]:px-4 container">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold">Your Recent Posts</h2>
              {!errorFetchingRecentPosts && yourRecentPosts.length > 0 && (
                <Link href="/dashboard">
                  <Button variant="link" className="text-accent-foreground p-0">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
            {yourRecentPosts.length === 0 && !loadingRecentPosts && !errorFetchingRecentPosts && (
              <p className="text-muted-foreground">You don’t have any recent posts yet. Start writing your first blog!</p>
            )}

            {loadingRecentPosts ? (
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={index} className="h-[140px] md:h-[124px] w-full rounded-xl" />
                ))}
              </div>
            ) : (
              errorFetchingRecentPosts ? (
                <div>
                  <p className="text-muted-foreground">Something went wrong while fetching your posts. Please try again.
                    <Button variant="link" className='text-purple-800 dark:text-purple-400 p-0 ml-2' onClick={fetchRecentPosts}>Retry <RotateCwIcon size={14} className="ml-1" /></Button>
                  </p>
                </div>
              ) :
                yourRecentPosts.length === 0 ? (
                  <p className="text-muted-foreground">You don’t have any recent posts yet. Start writing your first blog!</p>
                ) :
                  <div className="space-y-6">
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
            )}

          </section>
        </>
        :
        <section className="text-center min-h-[90vh] flex flex-col items-center justify-center max-[1440px]:px-4 container">
          <div className="absolute inset-0 z-0 pointer-events-none dark:bg-grid-purple-500/[0.08] bg-grid-purple-600/[0.1] [mask-image:radial-gradient(70vw_circle_at_center,white,transparent)]"></div>
          <div className="relative min-h-[50vh] flex flex-col items-center justify-center z-10">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-4 px-1 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 via-neutral-800 to-black dark:from-neutral-800 dark:via-neutral-100 dark:to-white">
              Welcome to BlogOp
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover insightful articles, share your knowledge, and engage with a community of passionate writers and readers.
            </p>
            <div>
              <Link href="/blogs">
                <Button size="lg">Explore Blogs</Button>
              </Link>
            </div>
          </div>
          <FeaturesSection />
        </section>
      }

      <section className="container relative max-[1440px]:px-4 z-10 my-12">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">Latest Posts</h2>
        {loadingLatestPosts ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          errorFetchingLatestPosts ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">Something went wrong while fetching latest posts. Please try again.
                <Button variant="link" className='text-purple-800 dark:text-purple-400 p-0 ml-2' onClick={fetchLatestPosts}>Retry <RotateCwIcon size={14} className="ml-1" /></Button>
              </p>
            </div>
          ) :
            featuredPosts.length === 0 ? (
              <p className="text-muted-foreground">No blogs available at the moment. Check back soon for updates!</p>
            ) :
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.slice(0, 3).map((post) => (
                  <BlogCard key={post._id} post={post} />
                ))}
              </div>
        )}
      </section>

      {!session &&
        <BackgroundBeamsWithCollision className='xl:container my-20 xl:rounded-xl mt-32'>
          <section className="text-center px-4">
            <div className="bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-primary via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="text-3xl md:text-4xl font-bold ">Join Our Community</span>
            </div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Create your own blog, share your thoughts, and receive feedback from readers. Start your writing journey today!
            </p>
            <Link href="/auth/signup">
              <Button size="lg">Sign Up Now</Button>
            </Link>
          </section>
        </BackgroundBeamsWithCollision>
      }
    </div>
  );
}
