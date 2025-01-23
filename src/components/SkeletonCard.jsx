import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { Skeleton } from './ui/skeleton'
function SkeletonCard() {
    return (
        <Card className="flex flex-col overflow-hidden h-full border-none shadow-none">
            <Skeleton className="h-52 w-full rounded-b-none" /> {/* Placeholder for the image */}
            <CardHeader className='space-y-4'>
                <Skeleton className="h-5 sm:h-6 w-[95%]" /> {/* Placeholder for the title */}
                <Skeleton className="h-5 sm:h-6 w-3/4" /> {/* Placeholder for the title */}
            </CardHeader>
            <CardContent className="mt-auto space-y-3 my-2">
                <Skeleton className="h-4 w-full mb-2" /> {/* Placeholder for preview text */}
                <Skeleton className="h-4 w-5/6" /> {/* Placeholder for secondary line */}
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2">
                <Skeleton className="h-5 w-3/5" /> {/* Placeholder for author */}
                <div className="flex items-center justify-between w-full">
                    <Skeleton className="h-5 w-28" /> {/* Placeholder for read time */}
                    <Skeleton className="h-8 w-24" /> {/* Placeholder for "Read More" button */}
                </div>
            </CardFooter>
        </Card>
    )
}

export default SkeletonCard