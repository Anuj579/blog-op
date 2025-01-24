import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-500/20 dark:bg-gray-700/20", className)}
            {...props}
        />
    )
}

export { Skeleton }
