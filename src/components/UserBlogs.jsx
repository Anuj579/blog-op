import { useState, useEffect } from "react"
import { BlogCard } from "./BlogCard"
import { useSession } from "next-auth/react"
import SkeletonCard from "./SkeletonCard"
import { RotateCwIcon } from "lucide-react"
import { Button } from "./ui/button"

export function UserBlogs() {
    const { data: session } = useSession()
    const [userBlogs, setUserBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [errorFetchingUserBlogs, setErrorFetchingUserBlogs] = useState(false)

    const fetchUserBlogs = async () => {
        setLoading(true)
        setErrorFetchingUserBlogs(false)
        await new Promise((resolve) => setTimeout(resolve, 500));
        try {
            const res = await fetch(`/api/blog?author=${session.user.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-store',
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) {
                setUserBlogs(data.blogs)
            } else {
                setErrorFetchingUserBlogs(true)
                console.error("Failed to fetch blogs:", data.error)
            }
        } catch (error) {
            console.error("Error fetching blogs:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (session) {
            // Fetch blogs of the logged-in user
            fetchUserBlogs()
        }
    }, [session])

    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
            {loading ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            ) :
                (errorFetchingUserBlogs ? (
                    <div>
                        <p className="text-muted-foreground">Something went wrong while fetching your posts. Please try again.
                            <Button variant="link" className='text-purple-800 dark:text-purple-400 p-0 ml-2' onClick={fetchUserBlogs}>Retry <RotateCwIcon size={14} className="ml-1" /></Button>
                        </p>
                    </div>
                ) : (
                    userBlogs.length === 0 ? (
                        <p className="text-muted-foreground">No blogs found. Start writing your first blog!</p>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {userBlogs.map((blog) => <BlogCard key={blog._id} post={blog} />)}
                        </div>
                    )
                ))
            }
        </div>
    )
}
