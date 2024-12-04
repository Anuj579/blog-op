import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, MessageCircle, PlusCircle } from 'lucide-react'
import { UserBlogs } from "@/components/UserBlogs"

export default function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
                    <p className="text-muted-foreground">Manage your blog posts and create new content</p>
                </div>
                <Button size="lg" className="mt-4 md:mt-0">
                    <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
                </Button>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-4">Blog Stats</h2>
                <div className="grid gap-6 md:grid-cols-2   ">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">23</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                            <MessageCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">289</div>
                        </CardContent>
                    </Card>
                </div>
            </section>
            <UserBlogs />
        </div>
    )
}

