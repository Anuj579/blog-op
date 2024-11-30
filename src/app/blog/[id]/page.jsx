'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Trash2, MessageCircle, Clock, Calendar, ThumbsUp } from 'lucide-react'
import Image from 'next/image'

const blogPost = {
    id: 1,
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components that can be composed to build complex applications. In this post, we'll cover the basics of React, including components, props, and state.\n\nTo get started with React, you'll need to have Node.js installed on your computer. Once you have Node.js, you can create a new React project using Create React App, a tool that sets up a new React project with a good default configuration.\n\nHere's a simple example of a React component:\n\n```jsx\nfunction Welcome(props) {\n  return <h1>Hello, {props.name}</h1>;\n}\n```\n\nThis component takes a 'name' prop and renders a greeting. You can use this component like this:\n\n```jsx\n<Welcome name=\"Alice\" />\n```\n\nReact's component-based architecture makes it easy to build complex UIs by breaking them down into smaller, reusable pieces. As you become more comfortable with React, you'll learn about more advanced concepts like hooks, context, and how to manage application state effectively.",
    author: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png"
    },
    date: "2023-06-01",
    readTime: 5,
    comments: [
        { id: 1, author: "Alice", content: "Great article! Very helpful for beginners.", date: "2023-06-02" },
        { id: 2, author: "Bob", content: "I'd love to see more advanced topics in the future.", date: "2023-06-03" }
    ],
    likes: 45,
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
}

export default function BlogPost() {
    const [isAuthor, setIsAuthor] = useState(false)
    const [liked, setLiked] = useState(false)
    const [commentText, setCommentText] = useState('')

    useEffect(() => {
        // This should be replaced with actual authentication logic
        setIsAuthor(Math.random() > 0.5)
    }, [])

    const handleLike = () => {
        setLiked(!liked)
        // Here you would typically update the like count on the server
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the comment to the server
        console.log('Comment submitted:', commentText)
        setCommentText('')
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="overflow-hidden">
                <Image
                    src={blogPost.image}
                    alt={blogPost.title}
                    width={1200}
                    height={600}
                    className="w-full h-[400px] object-cover"
                />
                <CardHeader>
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={blogPost.author.avatar} />
                                <AvatarFallback>{blogPost.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{blogPost.author.name}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    <time dateTime={blogPost.date}>{blogPost.date}</time>
                                </div>
                            </div>
                        </div>
                        {isAuthor && (
                            <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2" /> Edit
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <CardTitle className="text-3xl font-bold mb-2">{blogPost.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {blogPost.readTime} min read
                        </span>
                        <span className="flex items-center">
                            <MessageCircle className="mr-1 h-4 w-4" />
                            {blogPost.comments.length} comments
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLike}
                            className={`flex items-center ${liked ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {blogPost.likes + (liked ? 1 : 0)} likes
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                        {blogPost.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Comments</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <Textarea
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="mb-2"
                        />
                        <Button type="submit">Post Comment</Button>
                    </form>
                    <div className="space-y-4">
                        {blogPost.comments.map((comment) => (
                            <div key={comment.id} className="border-b pb-4 last:border-b-0">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Avatar>
                                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{comment.author}</p>
                                        <p className="text-sm text-muted-foreground">{comment.date}</p>
                                    </div>
                                </div>
                                <p>{comment.content}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </article>
    )
}

