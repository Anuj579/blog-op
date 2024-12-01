"use client"

import { BlogCard } from '@/components/BlogCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

function page() {
    const blogPosts = [
        { id: 1, title: "10 Tips for Better Coding", excerpt: "Improve your coding skills with these essential tips.", author: "Jane Doe", date: "2023-07-01", comments: 15, readTime: 5, image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 2, title: "The Future of Web Development", excerpt: "Explore upcoming trends in web development.", author: "John Smith", date: "2023-07-05", comments: 8, readTime: 7, image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 3, title: "Mastering React Hooks", excerpt: "Take your React skills to the next level with Hooks.", author: "Alice Johnson", date: "2023-07-10", comments: 23, readTime: 6, image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 4, title: "Introduction to TypeScript", excerpt: "Learn the basics of TypeScript and why you should use it.", author: "Bob Wilson", date: "2023-07-15", comments: 12, readTime: 8, image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 5, title: "Responsive Design Best Practices", excerpt: "Create beautiful, responsive websites with these tips.", author: "Emma Brown", date: "2023-07-20", comments: 19, readTime: 6, image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
        { id: 6, title: "Getting Started with Next.js", excerpt: "Build powerful React applications with Next.js.", author: "Chris Green", date: "2023-07-25", comments: 27, readTime: 9, image: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    ]

    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPosts, setFilteredPosts] = useState(blogPosts)

    const handleSearch = (e) => {
        e.preventDefault()
        const filtered = blogPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPosts(filtered)
    }

    return (
        <div className="container mx-auto px-4 py-8">
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

            {filteredPosts.length === 0 ? (
                <p className="text-center text-muted-foreground">No blogs found matching your search.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <BlogCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default page