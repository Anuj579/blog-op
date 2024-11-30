import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function BlogCard({ post }) {
    return (
        <Card className="flex flex-col overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
            <Image
                src={post.image}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3 mb-2">{post.excerpt}</p>
                <p className="text-sm text-muted-foreground">By {post.author} • {post.date}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min read
                    </span>
                    <span className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                    </span>
                </div>
                <Link href={`/blog/${post.id}`}>
                    <Button variant="outline">Read More</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}

