import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import formatDate from "@/utils/formatDate"

export function BlogCard({ post }) {

    return (
        <Card className="flex flex-col overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
            <Image
                src={post.image || "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                priority={true}
            />
            <CardHeader>
                <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-2 mb-2">{post.content}</p>
            </CardContent>
            <CardFooter className='flex flex-col items-start gap-2'>
                <p className="text-sm text-muted-foreground">By {post.author.firstname + " " + post.author.lastname} - {formatDate(post.createdAt)}</p>
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                        <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime} min read
                        </span>
                        <span className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-1" />
                            {post.comments.length}
                        </span>
                    </div>
                    <Link href={`/blog/${post._id}`}>
                        <Button variant="outline">Read More</Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}

