import { useState, useEffect } from "react"
import { BlogCard } from "./BlogCard"
import { useSession } from "next-auth/react"

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

    if (loading) {
        return <p>Loading...</p> 
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userBlogs.length === 0 ? (
                    <p>No blogs found. Start writing your first blog!</p>
                ) : (
                    userBlogs.map((blog) => (
                        <BlogCard key={blog._id} post={blog} />  // Use _id instead of id (MongoDB uses _id)
                    ))
                )}
            </div>
        </div>
    )
}
