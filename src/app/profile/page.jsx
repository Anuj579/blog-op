"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pencil, Check, Calendar, Camera, AlertTriangle, Loader2, MoreVertical, X } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from 'next-themes'
import { useSession } from 'next-auth/react'
import ImageCropper from '@/components/ImageCropper'
import { Skeleton } from '@/components/ui/skeleton'

function ProfilePage() {
    const [userDetails, setUserDetails] = useState({
        firstname: '',
        lastname: '',
        email: '',
        image: '',
        createdAt: ''
    })
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [previewUrl, setPreviewUrl] = useState('')
    const [isCropperOpen, setIsCropperOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [isProcessingProfilePic, setIsProcessingProfilePic] = useState(false);
    const [disabled, setDisabled] = useState(false)
    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
            setIsCropperOpen(true);
        }
    };

    const updateProfilePic = async (croppedImage) => {
        if (!croppedImage) {
            console.error("No image provided for profile picture update");
            return;
        }

        // Extract the base64 string (remove the data URL prefix)
        const base64Data = croppedImage.split(',')[1];

        // Decode the base64 string into a byte array
        const byteString = atob(base64Data);

        // Get the MIME type from the base64 string
        const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];

        // Create an array buffer from the decoded string
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const uintArray = new Uint8Array(arrayBuffer);

        // Populate the array buffer with the byte data
        for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
        }

        // Create a Blob from the byte array
        const blob = new Blob([uintArray], { type: mimeString });

        // Convert Blob to File (you can name the file whatever you want)
        const file = new File([blob], 'profile-pic.jpg', { type: mimeString });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "unsigned_preset");

        setIsProcessingProfilePic(true)
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_API_URL, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                setUserDetails((prevDetails) => ({ ...prevDetails, image: data.secure_url })); // Save the URL in state
            }
        } catch (error) {
            toast.error("Failed to upload user avatar.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });
            console.error("Error updating profile picture:", error.response || error);
        } finally {
            setIsProcessingProfilePic(false)
        }
    }

    const handleCrop = async (croppedImage) => {
        setPreviewUrl(croppedImage)
        await updateProfilePic(croppedImage)
        setIsCropperOpen(false);
    };

    const removeProfilePic = async () => {
        setIsProcessingProfilePic(true)
        try {
            const res = await fetch('/api/profile', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...userDetails, image: null })
            });
            if (res.ok) {
                setUserDetails({ ...userDetails, image: null })
            }
            setPreviewUrl(null)
            setIsDeleteDialogOpen(false)
        } catch (error) {
            console.log(error);
        } finally {
            setIsProcessingProfilePic(false)
        }
    }

    const updateProfileDetails = async () => {
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
                    name: `${userDetails.firstname} ${userDetails.lastname} ${userDetails.image}`
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
            updateProfileDetails()
        } else {
            setIsEditing(prev => !prev)
        }
    }

    const sendDeleteEmail = async () => {
        setDisabled(true)
        try {
            const res = await fetch('/api/send-delete-email', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email: session.user.email
                })
            })

            if (res.ok) {
                toast.success("Confirmation email sent successfully.", {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            } else {
                toast.error("Failed to send confirmation email.", {
                    autoClose: 4000,
                    theme: theme === "light" ? "light" : "dark",
                });
            }
        } catch (error) {
            console.log("Failed to send email:", error);
            toast.error("Failed to send email.", {
                autoClose: 4000,
                theme: theme === "light" ? "light" : "dark",
            });
        } finally {
            setDisabled(false)
            setDeleteAccountDialog(false)
        }
    }

    const SkeletonProfileCard = () => {
        return (
            <Card className="overflow-hidden">
                <CardContent className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center sm:items-start mb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                            <div className="relative">
                                {/* Skeleton for Avatar */}
                                <Skeleton className="w-24 h-24 rounded-full" />
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                {/* Skeleton for Name */}
                                <Skeleton className="w-48 h-7 mb-2" />
                                {/* Skeleton for Member Since */}
                                <Skeleton className="w-56 h-4 mt-1" />
                            </div>
                        </div>
                        {/* Skeleton for Edit Button */}
                        <Skeleton className="w-[72px] h-8 rounded-md" />
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                {/* Skeleton for First Name Input */}
                                <Skeleton className="w-20 h-5" />
                                <Skeleton className="w-full h-9" />
                            </div>
                            <div className="space-y-3">
                                {/* Skeleton for Last Name Input */}
                                <Skeleton className="w-20 h-5" />
                                <Skeleton className="w-full h-9" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {/* Skeleton for Email */}
                            <Skeleton className="w-14 h-5" />
                            <Skeleton className="w-full h-9" />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="bg-muted/20 p-6 sm:p-8">
                    {/* Skeleton for Delete Account Button */}
                    <Skeleton className="w-full sm:w-[135px] h-9 rounded-md" />
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className="container max-w-3xl mx-auto px-4 py-12">
            {loading ? <SkeletonProfileCard /> :
                <Card className="overflow-hidden shadow-lg">
                    <CardContent className="p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-6">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
                                <div className="relative">
                                    <Avatar className="w-24 h-24 border-2 border-primary">
                                        <AvatarImage src={userDetails.image || previewUrl} />
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
                                                onChange={handleFileChange}
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
                        <AlertDialog open={deleteAccountDialog} onOpenChange={setDeleteAccountDialog}>
                            <AlertDialogTrigger asChild>
                                <Button onClick={() => setDeleteAccountDialog(true)} variant="destructive" className="w-full sm:w-auto" aria-label="Delete Account">
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
                                        Confirm your decision, and we’ll send you an email to complete the account deletion process.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel disabled={disabled}>Cancel</AlertDialogCancel>
                                    <Button variant="destructive" onClick={sendDeleteEmail} disabled={disabled}>
                                        {disabled ? <span className='flex items-center gap-1'><Loader2 className='animate-spin w-5 h-5' />Confirm</span> : "Confirm"}
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            }

            {/* Remove profile pic dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogTrigger asChild>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='font-semibold flex items-center text-red-600 dark:text-red-500'>
                            <AlertTriangle className="h-5 w-5 mr-2" />
                            Remove Profile Picture
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove your profile picture?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button variant="destructive" onClick={removeProfilePic}>Remove</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={isProcessingProfilePic}>
                <AlertDialogContent className='max-w-80'>
                    <AlertDialogHeader className="flex gap-3 items-center ">
                        <AlertDialogTitle className='sr-only'>Processing profile pic</AlertDialogTitle>
                        <Loader2 className="animate-spin h-7 w-7" />
                        <AlertDialogDescription className='font-medium'>Processing profile picture...</AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            {/* Cropper dialog */}
            <Dialog open={isCropperOpen} onOpenChange={setIsCropperOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crop Your Image</DialogTitle>
                        <DialogDescription>
                            Crop your image to the desired size
                        </DialogDescription>
                    </DialogHeader>
                    <ImageCropper image={previewUrl} onCrop={handleCrop} onClose={() => setIsCropperOpen(false)} />
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </div>
    )
}

export default ProfilePage