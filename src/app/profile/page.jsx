"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Pencil, Check, Calendar, Camera, AlertCircle, AlertTriangle, Loader2, Eye, EyeOff, Lock, MoreVertical, X } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'

function page() {
    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        image: '',
        createdAt: ''
    })
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [inputType, setInputType] = useState('password')
    const toggleInputType = () => setInputType(prev => (prev === 'password' ? 'text' : 'password'));
    const { theme } = useTheme()
    const { data: session, update } = useSession();
    const { name } = session.user

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await fetch('/api/profile')
                if (res.ok) {
                    const data = await res.json()
                    setUserDetails({ firstname: data.user.firstname, lastname: data.user.lastname, email: data.user.email, image: data.user.image, createdAt: data.user.createdAt })
                } else {
                    console.log("Error in getting user profile details.");
                }
            } catch (error) {
                console.log("Error in fetch user details:", error);
            } finally {
                setLoading(false)
            }
        }
        fetchUserProfile()
    }, [])

    const updateProfile = async () => {
        try {
            const res = await fetch('/api/profile', {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(userDetails)
            })
            if (res.ok) {
                setIsEditing(false)
                await update({
                    name: `${userDetails.firstname} ${userDetails.lastname}`
                })
            } else {
                toast.error("Failed to update user profile.", {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            }
        } catch (error) {
            console.log("Error in updating profile:", error);
            toast.error("Error! Please try again.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });
        }
    }

    const handleEdit = () => {
        if (isEditing) {
            updateProfile()
        } else {
            setIsEditing(prev => !prev)
        }
    }

    if (loading)
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-11rem)]">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        )

    return (
        <div className="container max-w-3xl mx-auto px-4 py-8">
            <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                            <div className="relative">
                                <Avatar className="w-24 h-24 border-2 border-primary">
                                    <AvatarImage src={userDetails.image} />
                                    <AvatarFallback><img src={`https://ui-avatars.com/api/?name=${userDetails.firstname[0]}&background=6A5ACD&color=fff&size=100`} alt="user-avatar" /></AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    className="absolute bottom-0 right-0 rounded-full"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem onClick={() => document.getElementById('fileInput').click()}>
                                                    <Camera className="mr-2 h-4 w-4" />
                                                    <span>{userDetails.image ? 'Change' : 'Add'} Picture</span>
                                                </DropdownMenuItem>
                                                {userDetails.image && (
                                                    <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} >
                                                        <X className="mr-2 h-4 w-4" />
                                                        <span>Remove Picture</span>
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        <Input
                                            type="file"
                                            id='fileInput'
                                            accept="image/*"
                                            className="hidden"
                                        // onChange={handleFileChange}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold">
                                    {name}
                                </h2>
                                <p className="text-sm flex items-center justify-center sm:justify-start mt-1 text-muted-foreground">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Member since {new Date(userDetails.createdAt).toLocaleString('en-IN', {
                                        year: 'numeric',
                                        month: 'long',
                                    })}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEdit}
                            className="mt-4 sm:mt-0"
                        >
                            {isEditing ? <Check className="h-4 w-4 mr-2" /> : <Pencil className="h-4 w-4 mr-2" />}
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    value={userDetails.firstname}
                                    onChange={(e) => setUserDetails({ ...userDetails, firstname: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={userDetails.lastname}
                                    onChange={(e) => setUserDetails({ ...userDetails, lastname: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email {isEditing && '(Non-editable)'}</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={userDetails.email}
                                disabled
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/20 p-6 sm:p-8">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto e">
                                Delete Account
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle className='text-red-600 dark:text-red-500'>
                                    <AlertTriangle className="h-5 w-5 mr-2" />
                                    Delete Account
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <form >
                                <div className="space-y-4 py-4">
                                    <Label htmlFor="deleteConfirmation">Please type your password to confirm</Label>
                                    <div className="relative">
                                        <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
                                        <Input
                                            id="password"
                                            name="password"
                                            type={inputType}
                                            value={deleteConfirmation}
                                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                                            placeholder="Enter your password"
                                            autoComplete="off"
                                            className={`pl-10`}
                                            disabled={loading}
                                            required
                                        />
                                        <button className='absolute right-3 top-0 h-full' type='button' onClick={toggleInputType} aria-label={inputType === 'password' ? 'Show password' : 'Hide password'} title={inputType === 'password' ? 'Show password' : 'Hide password'}>
                                            {inputType === 'password' ? <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" /> : <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-yellow-600 dark:text-yellow-500 mb-6">
                                    <AlertCircle className="w-4 h-4" />
                                    <span>All of your data will be permanently removed.</span>
                                </div>
                                <AlertDialogFooter>
                                    <AlertDialogCancel >Cancel</AlertDialogCancel>
                                    <Button variant="destructive">Delete Account</Button>
                                </AlertDialogFooter>
                            </form>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
            <ToastContainer />
        </div>
    )
}

export default page