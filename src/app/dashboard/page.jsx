"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Loader2, MessageCircle, PlusCircle } from 'lucide-react'
import { UserBlogs } from "@/components/UserBlogs"
import Link from "next/link"

export default function DashboardPage() {
    const [totalBlogs, setTotalBlogs] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("/api/dashboard")
                if (response.ok) {
                    const data = await response.json()
                    if (data.success) {
                        setTotalBlogs(data.totalBlogs)
                        setTotalComments(data.totalComments)
                    } else {
                        setError(data.error)
                    }
                } else {
                    setError("Failed to fetch data")
                }
            } catch (error) {
                setError("An error occurred while fetching data")
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[82vh]">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div>Error: {error}</div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
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

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Blog Stats</h2>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalBlogs}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalComments}</div>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <UserBlogs />
        </div>
    )
}
