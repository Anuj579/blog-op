"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react"

export default function EditBlogPage() {
    const { data: session } = useSession()
    const [body, setBody] = useState({
        title: "",
        content: "",
        coverImage: ""
    })
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false)

    const { id } = useParams()
    const { theme } = useTheme()
    const router = useRouter()

    useEffect(() => {
        const fetchAndAuthorize = async () => {
            setLoading(true)
            if (id) {
                try {
                    const res = await fetch(`/api/blog/${id}`)
                    const data = await res.json()
                    // console.log("Blog details:", data.blog);
                    setBody({ title: data.blog.title, content: data.blog.content, coverImage: data.blog.coverImage })
                    if (!session || session.user.id !== data.blog.author._id) {
                        router.push(`/blog/${id}`)
                    } else {
                        setLoading(false)
                    }
                } catch (error) {
                    console.log("Error in fetching blog details:", error);
                    router.push(`/blog/${id}`)
                }
            }
        }
        fetchAndAuthorize()
    }, [session])

    const handleUpdateBlog = async (e) => {
        e.preventDefault()
        setDisabled(true)
        try {
            const res = await fetch(`/api/blog/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            if (res.ok) {
                router.push(`/blog/${id}`);
            } else {
                toast.error("Failed to update the blog.", {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
                console.log("Error:", res.statusText);
            }
        } catch (error) {
            toast.error("Failed to update the blog.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });
            console.log("Error:", error);
        } finally {
            setDisabled(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[82vh]">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Edit Your Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateBlog}>
                        <fieldset disabled={disabled}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title">Title</Label>
                                    <Input id="title" value={body.title} onChange={(e) => setBody({ ...body, title: e.target.value })} placeholder="Enter your blog title" required />
                                </div>
                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea id="content" value={body.content} onChange={(e) => setBody({ ...body, content: e.target.value })} placeholder="Write your blog content here" rows={10} required />
                                </div>
                                <div>
                                    <Label htmlFor="coverImage">Cover Image</Label>
                                    <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
                                </div>
                            </div>
                            <Button className="mt-5">
                                {disabled ? <span className='flex items-center gap-1'><Loader2 className='animate-spin' />Updating Post</span> : "Update Post"}
                            </Button>
                        </fieldset>
                    </form>
                </CardContent>
            </Card>
            <ToastContainer />
        </div>
    )
}

