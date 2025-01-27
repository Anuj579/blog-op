"use client"

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Edit, Trash2, Clock, Calendar, MoreVertical, Share2, AlertTriangle, LinkIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'
import formatDate from '@/utils/formatDate'

export default function BlogPost() {
    const { data: session } = useSession()
    const [blog, setBlog] = useState({})
    const [isUserBlog, setIsUserBlog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [content, setContent] = useState('')
    const [comment, setComment] = useState({})
    const [showAlert, setShowAlert] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const { id } = useParams()
    const { theme } = useTheme()
    const router = useRouter()

    useEffect(() => {
        const fetchBlogDetail = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/blog/${id}`)
                const data = await res.json()
                if (data.success) {
                    setBlog(data.blog)
                } else {
                    console.log("Error in fetching blog details:", data.error);
                }
            } catch (error) {
                console.log("Error in fetching blog details:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchBlogDetail()
    }, [id, comment])

    useEffect(() => {
        if (session && blog.author) {
            setIsUserBlog(session.user.id === blog.author._id)
        } else {
            setIsUserBlog(false)
        }
    }, [session, blog])

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        try {
            const res = await fetch(`/api/blog/${id}/comment`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ content })
            })

            if (res.ok) {
                setContent("")
                const data = await res.json()
                setComment(data.comment)
            } else if (res.status === 401) {
                toast.error('Please log in to post a comment.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            }
            else {
                toast.error('Failed to add comment.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            }
        } catch (error) {
            toast.error('Something went wrong. Try again!', {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark"
            })
            console.log("Error adding comment:", error);
        } finally {
            setDisabled(false)
        }
    }

    const handleShare = async (platform) => {
        const shareData = {
            title: 'Check out this blog!',
            text: 'I found this amazing blog on BlogOp. Take a look!',
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

    const handleDeleteBlog = async () => {
        setDisabled(true)
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'DELETE'
            })
            if (res.ok) {
                router.push('/dashboard')
            } else {
                toast.error('Failed to delete blog.', {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark"
                })
            }
        } catch (error) {
            toast.error('Failed to delete blog.', {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark"
            })
        } finally {
            setDisabled(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-11rem)]">
                <div className="loader"></div>
            </div>
        );
    }
    return (
        <article className="container mx-auto px-4 py-10 max-w-4xl">
            <Card className="overflow-hidden">
                <Image
                    src={blog.coverImage || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                    alt={blog.title}
                    width={1200}
                    height={600}
                    className="w-full h-full sm:h-[400px] object-cover"
                    priority={true}
                />
                <CardHeader className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src={blog.author.image} />
                                <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${blog.author.firstname[0]}&background=6A5ACD&color=fff&size=100`} alt="user-avatar" /></AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{blog.author.firstname} {blog.author.lastname}</p>
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-1 h-4 w-4" />
                                    <time dateTime={formatDate(blog.createdAt)}>{formatDate(blog.createdAt)}</time>
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
                            {isUserBlog && (
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
                                    <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild onClick={handleDeleteBlog} disabled={disabled}><Button className='bg-red-600 hover:bg-red-700 dark:text-white'>Delete Blog</Button></AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold">{blog.title}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground pb-2">
                        <Clock className="mr-1 h-4 w-4" />
                        {blog.readTime} min read
                    </div>
                    <hr />
                </CardHeader>
                <CardContent className="mt-8">
                    <div className="prose dark:prose-invert max-w-none">
                        <div className='max-w-full' dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Comments ({blog.comments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCommentSubmit} className="mb-6">
                        <fieldset disabled={disabled}>
                            <Textarea
                                placeholder="Write a comment..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mb-4"
                                required
                            />
                            <Button type="submit">
                                {disabled ? <span className='flex items-center gap-1'><Loader2 className='animate-spin h-5 w-5' />Posting Comment</span> : "Post Comment"}
                            </Button>
                        </fieldset>
                    </form>
                    <div className="space-y-4">
                        {blog.comments.length > 0 && blog.comments.map((comment) => (
                            <div key={comment._id} className="border-b pb-4 last:border-b-0">
                                <div className="flex items-start space-x-3 mb-2">
                                    <Avatar>
                                        <AvatarImage src={comment.user.image} />
                                        <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${comment.user.firstname[0]}&background=6A5ACD&color=fff&size=100`} alt="user-avatar" /></AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{comment.user.firstname}</p>
                                        <p className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</p>
                                        <p className='mt-1'>{comment.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <ToastContainer />
        </article>
    )
}

