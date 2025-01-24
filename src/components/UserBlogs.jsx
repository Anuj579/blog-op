import { useState, useEffect } from "react"
import { BlogCard } from "./BlogCard"
import { useSession } from "next-auth/react"
import SkeletonCard from "./SkeletonCard"

export function UserBlogs() {
    const { data: session } = useSession()
    const [userBlogs, setUserBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session) {
            // Fetch blogs of the logged-in user

            const fetchUserBlogs = async () => {
                try {
                    const res = await fetch(`/api/blog?author=${session.user.id}`)
                    const data = await res.json()
                    if (data.success) {
                        setUserBlogs(data.blogs)
                    } else {
                        console.error("Failed to fetch blogs:", data.error)
                    }
                } catch (error) {
                    console.error("Error fetching blogs:", error)
                } finally {
                    setLoading(false)
                }
            }

            fetchUserBlogs()
        }
    }, [session])

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {loading
                    ? // Show dynamic skeletons while loading
                    Array.from({ length: 3 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                    : userBlogs.length === 0
                        ? // Show message if no blogs are found
                        <p>No blogs found. Start writing your first blog!</p>
                        : // Show blog cards if data is loaded
                        userBlogs.map((blog) => <BlogCard key={blog._id} post={blog} />)}
            </div>
        </div>
    )
}
