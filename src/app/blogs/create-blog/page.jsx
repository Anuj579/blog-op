import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CreateBlogPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Create New Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" placeholder="Enter your blog title" />
                            </div>
                            <div>
                                <Label htmlFor="content">Content</Label>
                                <Textarea id="content" placeholder="Write your blog content here" rows={10} />
                            </div>
                            <div>
                                <Label htmlFor="image">Cover Image URL</Label>
                                <Input id="image" placeholder="Enter the URL of your cover image" />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Publish Post</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

