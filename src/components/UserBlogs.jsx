import { BlogCard } from "./BlogCard"

const userBlogs = [
    { id: 1, title: "Getting Started with React", excerpt: "Learn the basics of React and start building awesome apps.", author: "John Doe", date: "2023-06-01", comments: 23, readTime: 5, image: "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 2, title: "Advanced JavaScript Techniques", excerpt: "Dive deep into JavaScript and level up your coding skills.", author: "John Doe", date: "2023-06-15", comments: 17, readTime: 8, image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { id: 3, title: "CSS Grid Mastery", excerpt: "Master CSS Grid and create stunning layouts with ease.", author: "John Doe", date: "2023-06-30", comments: 12, readTime: 6, image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
]

export function UserBlogs() {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Your Blog Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {userBlogs.map((blog) => (
                    <BlogCard key={blog.id} post={blog} />
                ))}
            </div>
        </div>
    )
}

