"use client"

import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const { status } = useSession(); // Check session status

    // Show a global loader while session is loading
    if (status === 'loading') {
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
