"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react"

export default function CreateBlogPage() {
    const [body, setBody] = useState({
        title: '',
        content: '',
        coverImage: ''
    })
    const [loading, setLoading] = useState(false)
    const { data: session } = useSession()
    const router = useRouter()

    const handleCreateBlog = async (e) => {
        e.preventDefault()
        const blogData = {
            ...body,
            author: session.user.id
        }
        setLoading(true)
        try {
            const res = await fetch('/api/blog/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blogData),
            })

            if (res.ok) {
                router.push('/', { showBlogCreatedToast: true })
            } else {
                console.log("Error:", res.statusText);
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error("Faile to create the blog.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Create New Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateBlog}>
                        <fieldset disabled={loading}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" name="title" placeholder="Enter your blog title" required />
                                </div>
                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea id="content" name="content" placeholder="Write your blog content here" rows={10} required />
                                </div>
                                <div>
                                    <Label htmlFor="coverImage">Cover Image</Label>
                                    <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
                                </div>
                            </div>
                            <Button className="mt-5">
                                {loading ? <span className='flex items-center gap-1'><Loader2 className='animate-spin' />Publish Post</span> : "Publish Post"}
                            </Button>
                        </fieldset>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    )
}

