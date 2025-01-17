'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Loader2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'next/navigation';

export default function DeleteAccountPage() {
    const [isExpired, setIsExpired] = useState(false);
    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false)

    const { token } = useParams();
    
    useEffect(() => {
        const checkToken = async () => {
            try {
                const res = await fetch(`/api/validate-token?token=${token}`);
                const data = await res.json();
                if (data.isExpired) {
                    setIsExpired(true);
                }
            } catch (error) {
                console.error('Error checking token:', error);
            } finally {
                setLoading(false);
            }
        };

        checkToken();
    }, []);

    const handleDeleteAccount = async (e) => {
        e.preventDefault();
        setDisabled(true)
        try {
            const response = await fetch('/api/delete-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                await signOut({ callbackUrl: '/auth/login' });
            } else {
                toast.error("Failed to delete account.", {
                    autoClose: 4000,
                    theme: "dark",
                });
            }
        } catch (err) {
            console.error('Error deleting account:', err);
            toast.error("Something went wrong!", {
                autoClose: 4000,
                theme: "dark",
            });
        } finally {
            setDisabled(false)
        }
    };

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-11rem)]">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        )

    if (isExpired) {
        return (
            <div className="container mx-auto max-w-md px-4 py-12">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-red-600">
                            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                            Link Expired
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>
                            The link you followed has expired. Please request a new confirmation link.
                        </p>
                    </CardContent>
                    <CardFooter className="justify-center">
                        <Link href="/" className=''>
                            <Button variant="" className='w-full'>
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto max-w-md px-4 py-12">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-red-600">
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                        Delete Your Account
                    </CardTitle>
                </CardHeader>
                <CardContent className='p-6 pb-4'>
                    <p className="mb-4">
                        Are you sure you want to delete your account? This action cannot be undone.
                    </p>
                    <form onSubmit={handleDeleteAccount}>
                        <Button type="submit" variant="destructive" className="w-full" disabled={disabled}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="">
                    <Link href="/" className='w-full'>
                        <Button variant="outline" className='w-full' disabled={disabled}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
            <ToastContainer />
        </div>
    );
}
