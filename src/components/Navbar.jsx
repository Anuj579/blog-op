"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { Menu, NotebookPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Navbar = () => {
    const [session, setSession] = useState(null)
    const [open, setOpen] = useState(false)
    const closeSheet = () => {
        setOpen(false)
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-card/60">
            <div className="px-4 md:container flex h-14 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="font-bold text-xl">BlogApp</span>
                </Link>
                <nav className="items-center space-x-6 text-sm font-medium hidden md:flex">
                    <Link href="/">Home</Link>
                    <Link href="/blog">Blog</Link>
                </nav>
                <div className="flex flex-1 items-center justify-end">
                    <nav className="flex items-center space-x-2">
                        <div className="hidden md:flex">
                            {!session ? (
                                <>
                                    <Link href="/auth/login">
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link href="/auth/signup">
                                        <Button>Sign Up</Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/profile">
                                        <Button variant="ghost">Profile</Button>
                                    </Link>
                                    <Button onClick={() => signOut()}>Logout</Button>
                                </>
                            )}
                        </div>
                        <ThemeToggle />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden p-0 m-0">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" >
                                <DropdownMenuItem>
                                    <Link href='/'>Home</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem >
                                    <Link href='/auth/login'>Login</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                </div>
            </div>
        </header>
    );
};

export default Navbar;
