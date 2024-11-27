"use client"

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <div className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-50">
      <h1>Welcome to my blog!</h1>
      <Link href='/auth/signup'>
        Signup
      </Link><br />
      <Link href='/auth/login'>
        Login
      </Link><br /><br />
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === "dark" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
}
