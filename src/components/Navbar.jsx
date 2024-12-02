"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const NavLink = ({ href, children }) => {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={`text-sm font-medium transition-colors hover:text-primary ${isActive
                ? 'text-primary'
                : 'text-muted-foreground'
                }`}
        >
            {children}
        </Link>
    )
}

const UserMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 md:h-9 md:w-9">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            anatoly3449@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex w-full">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const Navbar = () => {
    const [session, setSession] = useState(true)
    const router = useRouter()

    return (
        <header className="sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-card/60 md:px-4">
            <div className="md:container flex p-3 items-center">
                <div className="flex items-center">
                    <Link href="/" className="mr-6 flex items-center">
                        <span className="font-bold text-xl">BlogApp</span>
                    </Link>
                    <nav className="items-center space-x-6 text-sm font-medium hidden md:inline-flex">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/blogs">Explore</NavLink>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-end">
                    <nav className="flex items-center gap-3">
                        <ThemeToggle />
                        {session &&
                            <div className="md:hidden">
                                <UserMenu />
                            </div>
                        }
                        <div className="hidden md:flex gap-2">
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
                                <UserMenu />
                            )}
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="md:hidden p-1">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle menu</span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" >
                                <DropdownMenuItem onClick={() => router.push("/")}>
                                    Home
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push("/blogs")}>
                                    Explore
                                </DropdownMenuItem>
                                {!session && <>
                                    <DropdownMenuItem onClick={() => router.push("/auth/login")}>
                                        Login
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push("/auth/signup")}>
                                        Sign Up
                                    </DropdownMenuItem>
                                </>}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                </div>
            </div>
        </header >
    );
};

export default Navbar;
