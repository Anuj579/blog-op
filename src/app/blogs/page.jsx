"use client"

import { BlogCard } from '@/components/BlogCard'
import SkeletonCard from '@/components/SkeletonCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCwIcon, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function ExplorePage() {
    const [blogPosts, setBlogPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorLoadingBlogs, setErrorLoadingBlogs] = useState(false)

    const fetchBlogs = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/blog/list')
            if (!res.ok) {
                throw new Error(`Failed to fetch blogs: ${res.statusText}`)
            }
            const data = await res.json()
            if (data.success) {
                setBlogPosts(data.blogs)
                setFilteredPosts(data.blogs)
            } else {
                setErrorLoadingBlogs(true)
                console.error(data.error)
            }
        } catch (error) {
            console.error('Error fetching blogs:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBlogs()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        const filtered = blogPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.firstname.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(filtered)
    }

    return (
        <div className="container mx-auto px-4 py-8 mb-6">
            <h1 className="text-3xl font-bold mb-8">Explore Blogs</h1>
            <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className=""
                    />
                    <Button type="submit">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                    </Button>
                </div>
            </form>

            {loading ?
                (<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>)
                : errorLoadingBlogs ? (
                    <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                            Something went wrong while fetching blogs. <br /> Please try again.
                            <Button variant="link" className='text-purple-800 dark:text-purple-400 p-0 ml-2' onClick={fetchBlogs}>Retry <RotateCwIcon size={14} className="ml-1" /></Button>
                        </p>
                    </div>
                ) :
                    filteredPosts.length === 0 ? (
                        <p className="text-center text-muted-foreground">No blogs found.</p>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
                    )

            }
        </div>
    )
}

export default ExplorePage