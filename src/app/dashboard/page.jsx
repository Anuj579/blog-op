"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, PlusCircle, RotateCwIcon } from 'lucide-react'
import { UserBlogs } from "@/components/UserBlogs"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
    const [totalBlogs, setTotalBlogs] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [loading, setLoading] = useState(true)
    const [errorLoadingStats, setErrorLoadingStats] = useState(false)

    const fetchDashboardData = async () => {
        setLoading(true)
        setErrorLoadingStats(false)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            })
            if (response.ok) {
                const data = await response.json()
                if (data.success) {
                    setTotalBlogs(data.totalBlogs)
                    setTotalComments(data.totalComments)
                } else {
                    setErrorLoadingStats(true)
                    console.log("Error loading stats:", data.error);
                }
            } else {
                setErrorLoadingStats(true)
            }
        } catch (error) {
            console.log("Error fetching dashboard data:", error);
            setErrorLoadingStats(true)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
                    <p className="text-muted-foreground">Manage your blog posts and create new content</p>
                </div>
                <Link href="/blogs/create-blog">
                    <Button size="lg" className="mt-4 md:mt-0">
                        <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
                    </Button>
                </Link>
            </div>

            <section className="mb-16">
                <h2 className="text-2xl font-semibold mb-4">Blog Stats</h2>
                {loading ? (
                    <div className="grid gap-8 md:grid-cols-2">
                        {Array.from({ length: 2 }).map((_, index) =>
                            <Skeleton key={index} className="h-[116px] w-full rounded-xl" />
                        )}
                    </div>
                ) : (
                    errorLoadingStats ? (
                        <div>
                            <p className="text-muted-foreground">Something went wrong while fetching your blog stats. Please try again.
                                <Button variant="link" className='text-purple-800 dark:text-purple-400 p-0 ml-2' onClick={fetchDashboardData}>Retry <RotateCwIcon size={14} className="ml-1" /></Button>
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xl sm:text-xl font-medium">Total Posts</CardTitle>
                                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalBlogs}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-xl sm:text-xl font-medium">Total Comments</CardTitle>
                                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{totalComments}</div>
                                </CardContent>
                            </Card>
                        </div>
                    )
                )}
            </section>
            <UserBlogs />
        </div>
    )
}
