import { RotateCwIcon } from 'lucide-react'
import { Button } from './ui/button'

function ErrorMessage({ fetchData, className }) {
    return (
        <div className={className}>
            <p className="text-muted-foreground">Something went wrong while fetching your posts. Please try again.
                <Button variant="link" className='text-purple-800 dark:text-purple-400 p-0 ml-2' onClick={fetchData}>Retry <RotateCwIcon size={14} className="ml-1" /></Button>
            </p>
            <p className="text-sm text-muted-foreground">
                If retrying doesn't work, try refreshing the page.
            </p>
        </div>
    )
}

export default ErrorMessage