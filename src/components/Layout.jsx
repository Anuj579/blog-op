"use client"

import { useSession } from 'next-auth/react';
import { Loader2, RefreshCcwIcon } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

const Layout = ({ children }) => {
    const { data: session, status } = useSession(); // Check session status
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (status === "loading") {
            setLoading(true);
            setError(false)
        } else if (status === "authenticated" || status === "unauthenticated") {
            setLoading(false);
            setError(false)
        } else {
            setLoading(false);
            setError(true);
        }
    }, [status, session])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className='flex flex-col items-center gap-4 p-4'>
                    <h1 className='text-3xl font-bold text-center'>Error occured try refreshing the page.</h1>
                    <Button className='gap-2' onClick={()=> window.location.reload()}><RefreshCcwIcon size={20} />Refresh</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
