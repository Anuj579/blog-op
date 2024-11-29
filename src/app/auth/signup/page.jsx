"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail, NotebookPen, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { useTheme } from 'next-themes';

function page() {
    const { theme } = useTheme()
    const [inputType, setInputType] = useState('password')
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    return (
        <div className="flex items-center justify-center mx-4 my-24">
            <Card className={`w-full max-w-md`}>
                <CardHeader className="space-y-1">
                    <div className="flex items-center justify-center mb-4">
                        <NotebookPen className={`h-12 w-12`} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                    <CardDescription className={`text-center`}>
                    Create a new account to start blogging
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstname" className="text-sm">First Name</label>
                            <div className="relative">
                                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted`} />
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder="Anuj"
                                    autoComplete="username"
                                    className={`pl-10 `}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastname" className="text-sm">Last Name</label>
                            <div className="relative">
                                <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder="Chaudhary"
                                    autoComplete="username"
                                    className={`pl-10 `}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm">Email</label>
                            <div className="relative">
                                <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="anujchaudhary3112@gmail.com"
                                    autoComplete="email"
                                    className={`pl-10 `}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm">Password</label>
                            <div className="relative">
                                <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                <Input
                                    id="password"
                                    type={inputType}
                                    placeholder="••••••••"
                                    autoComplete="new-password"
                                    className={`pl-10`}
                                    required
                                />
                                <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                                    {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                </button>
                            </div>
                        </div>
                        <Button className='w-full'>
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
                <hr className="border-border mb-4 mx-6" />
                <CardFooter>
                    <p className={`text-sm text-center w-full `}>
                        Already have an account?
                        <Link href="/auth/login" className={`font-semibold ml-1 hover:underline`}>
                            Log In
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page