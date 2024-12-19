"use client"

import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
    const { data: session, status } = useSession(); // Check session status
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // console.log("Status:", status);
        // console.log("Session:", session);

        if (status === "loading") {
            setLoading(true);
        } else if (status === "authenticated" || status === "unauthenticated") {
            setLoading(false);
        }
    }, [status, session])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin h-8 w-8" />
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
