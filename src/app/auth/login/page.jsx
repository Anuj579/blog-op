"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { signIn, useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

function page() {
    const [inputType, setInputType] = useState('password')
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    const { theme } = useTheme()
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const [loading, setLoading] = useState(false)
    const { status } = useSession();

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const loginRes = await signIn("credentials", {
                redirect: false,
                email: formData.email,
                password: formData.password
            })
            if (loginRes.ok) {
                router.push('/')
            } else if (loginRes.error) {
                toast.error("Invalid email or password!", {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            }
        } catch (error) {
            console.log("Failed to login:", error);
            toast.error("Failed to login", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });

        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            const res = await signIn("google", { redirect: false });
            if (res?.error) {
                toast.error(res.error, {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            } else if (res?.ok) {
                if (status === "authenticated") {
                    router.push('/');
                }
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            })
            console.error(error);
        }
    };
    return (
        <div className="flex items-center justify-center mx-4 my-6 min-h-[calc(100vh-10rem)]">
            <Card className={`w-full max-w-md`}>
                <CardHeader className="space-y-2">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className={`pl-10 `}
                                    disabled={loading}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="password"
                                    name="password"
                                    type={inputType}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    autoComplete="new-password"
                                    className={`pl-10`}
                                    disabled={loading}
                                    required
                                />
                                <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                                    {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                </button>
                            </div>
                        </div>
                        <Button className="w-full mt-2" disabled={loading}>
                            {loading ? <span className='flex items-center gap-1'><Loader2 className='animate-spin' />Login</span> : "Login"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className='flex flex-col space-y-4'>
                    <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-card px-2 text-muted-foreground">OR</span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleGoogleLogin} disabled={loading}>
                        <svg className="mr-2 h-4 w-4" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
                        Continue with Google
                    </Button>
                    <p className={`text-sm text-center w-full`}>
                        <span className='text-muted-foreground'>Don't have an account?</span>
                        <Link href="/auth/signup" className={`font-medium ml-1 hover:underline`}>
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default page