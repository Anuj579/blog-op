"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useTheme } from "next-themes"
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react"
import BlogEditor from "@/components/BlogEditor"
import { Textarea } from "@/components/ui/textarea"

export default function EditBlogPage() {
    const { data: session } = useSession()
    const [body, setBody] = useState({
        title: '',
        previewText: '',
        content: '',
        coverImage: ''
    })
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [uploadingImage, setUploadingImage] = useState(false)

    const { id } = useParams()
    const { theme } = useTheme()
    const router = useRouter()

    const handleContentChange = (newContent) => {
        setBody((prevState) => ({
            ...prevState,
            content: newContent
        }));
    };

    useEffect(() => {
        const fetchAndAuthorize = async () => {
            setLoading(true)
            if (id) {
                try {
                    const res = await fetch(`/api/blog/${id}`)
                    const data = await res.json()
                    // console.log("Blog details:", data.blog);
                    setBody({ title: data.blog.title, previewText: data.blog.previewText, content: data.blog.content, coverImage: data.blog.coverImage })
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
    }, [])

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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (!file) return;
        setUploadingImage(true)
        const formData = new FormData();
        formData.append("file", file); // Add the file to the request
        formData.append("upload_preset", "unsigned_preset");

        try {
            const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                setBody((prevBody) => ({ ...prevBody, coverImage: data.secure_url })); // Save the URL in state
            }
        } catch (error) {
            toast.error("Failed to upload image.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });
            console.error("Error uploading image:", error);
        } finally {
            setUploadingImage(false)
        }
    };

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
                                    <Label htmlFor="previewText">Preview Text</Label>
                                    <Textarea
                                        id="previewText"
                                        name="previewText"
                                        value={body.previewText}
                                        onChange={(e) => setBody({ ...body, previewText: e.target.value })}
                                        placeholder="Write a short preview of your blog"
                                        rows={2}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="content">Content</Label>
                                    <BlogEditor value={body.content} onEditorChange={handleContentChange} />
                                </div>
                                <div>
                                    <Label htmlFor="coverImage">Cover Image</Label>
                                    <Input id="coverImage" name="coverImage" type="file" accept="image/*" onChange={handleImageUpload} />
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
            <AlertDialog open={uploadingImage}>
                <AlertDialogContent className='max-w-80'>
                    <AlertDialogHeader className="flex gap-4 items-center ">
                        <AlertDialogTitle className='sr-only'>Uploading Image</AlertDialogTitle>
                        <Loader2 className="animate-spin h-7 w-7" />
                        <AlertDialogDescription className='font-medium'>Uploading Image...</AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

