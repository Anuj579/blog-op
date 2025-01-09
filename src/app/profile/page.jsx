"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pencil, Check, Calendar, Camera, AlertCircle, AlertTriangle } from 'lucide-react'

function page() {
    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        image: '',
        createdAt: ''
    })
    const [isEditing, setIsEditing] = useState(false)
    // const [tempUser, setTempUser] = useState(user)
    const [deleteConfirmation, setDeleteConfirmation] = useState('')

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
            }
        }
        fetchUserProfile()
    }, [])

    const handleCancel = () => {
        // setFormData({
        //   firstname: user.firstname,
        //   lastname: user.lastname,
        //   email: user.email,
        // });
        setIsEditing(false); // Exit edit mode
    };

    return (
        <div className="container max-w-3xl mx-auto px-4 py-8">
            <Card className="overflow-hidden shadow-lg">
                <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                            <div className="relative">
                                <Avatar className="w-24 h-24 border-2 border-primary">
                                    <AvatarImage src={userDetails.image} />
                                    <AvatarFallback>{userDetails.firstname[0]}</AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <Label
                                        htmlFor="profilePic"
                                        className="absolute bottom-0 right-0 p-1 bg-primary text-primary-foreground rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                                    >
                                        <Camera className="h-5 w-5" />
                                        <input
                                            type="file"
                                            id="profilePic"
                                            className="hidden"
                                            // onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </Label>
                                )}
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold">
                                    {`${userDetails.firstname} ${userDetails.lastname}`}
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
                            // onClick={handleEdit}
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
                                    // onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    value={userDetails.lastname}
                                    // onChange={handleChange}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
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
                <CardFooter className="bg-muted/50 p-6 sm:p-8">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full sm:w-auto e">
                                {/* <Trash2 className="h-4 w-4 mr-2" /> */}
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
                                    <Input
                                        id="deleteConfirmation"
                                        type="password"
                                        value={deleteConfirmation}
                                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-yellow-500 mb-6">
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
        </div>
    )
}

export default page