'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Edit, Trash2, Clock, Calendar, MoreVertical, Share2, AlertTriangle, LinkIcon } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'

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
    image: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
}

export default function BlogPost() {
    const { data: session } = useSession()
    const [commentText, setCommentText] = useState('')
    const [showAlert, setShowAlert] = useState(false)
    const { id } = useParams()
    const { theme } = useTheme()

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the comment to the server
        console.log('Comment submitted:', commentText)
        setCommentText('')
    }

    const handleShare = async (platform) => {
        const shareData = {
            title: 'Check out this blog!',
            text: 'I found this amazing blog on BlogApp. Take a look!',
            url: window.location.href,
        }
        if (platform === 'copy') {
            try {
                await navigator.clipboard.writeText(window.location.href)
                toast.success('Link copied successfully!', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            } catch (err) {
                console.error('Error copying text: ', err)
                toast.error('Failed to copy link.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            }
        } else {
            let url
            switch (platform) {
                case 'facebook':
                    url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
                    break
                case 'twitter':
                    url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(window.location.href)}`
                    break
                case 'linkedin':
                    url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(shareData.title)}`
                    break
            }
            window.open(url, '_blank')
        }
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Card className="overflow-hidden">
                <Image
                    src={blogPost.image}
                    alt={blogPost.title}
                    width={1200}
                    height={600}
                    className="w-full h-[300px] sm:h-[400px] object-cover"
                />
                <CardHeader className="space-y-4">
                    <div className="flex justify-between items-start">
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
                        <div className="flex items-center space-x-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <Share2 className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onSelect={() => handleShare('copy')}>
                                        <LinkIcon className="mr-2 h-4 w-4" /> Copy Link
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleShare('facebook')}>
                                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> Share on Facebook
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleShare('twitter')}>
                                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg> Share on Twitter
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => handleShare('linkedin')}>
                                        <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" /></svg> Share on LinkedIn
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            {session && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={id ? `/blog/${id}/edit` : '#'}>
                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setShowAlert(true)}>
                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                            <AlertDialogTrigger asChild>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle className='text-red-600 dark:text-red-500'>
                                        <AlertTriangle className="h-5 w-5 mr-2" />
                                        Confirm Deletion
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete the blog? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild><Button className='bg-red-600 hover:bg-red-700 dark:text-white'>Delete Blog</Button></AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <CardTitle className="text-3xl font-bold">{blogPost.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {blogPost.readTime} min read
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
            <ToastContainer />
        </article>
    )
}

