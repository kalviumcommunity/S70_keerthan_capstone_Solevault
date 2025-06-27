import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";


// Zod schema for the traditional email/password form
const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUp = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    const [signupStep, setSignupStep] = useState('form'); // Can be 'form' or 'otp'
    const [userEmail, setUserEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "", lastName: "", email: "", password: "", confirmPassword: "",
        },
    });

    // Handler for the traditional form submission (starts OTP flow)
    const onFormSubmit = async (data) => {
        setIsSubmitting(true);
        setUserEmail(data.email);
        try {
            await axios.post(`${API_BASE_URL}/auth/send-otp`, data);
            toast({
                title: "OTP Sent!",
                description: `A verification code has been sent to ${data.email}.`,
            });
            setSignupStep('otp');
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
            toast({ title: "Sign Up Error", description: errorMessage, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handler for the OTP verification step
    const onOtpSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_BASE_URL}/auth/verify-signup`, { email: userEmail, otp });
            toast({
                title: "Verification Successful!",
                description: "Your account has been created. Please sign in to continue.",
            });
            navigate("/signin");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";
            toast({ title: "OTP Verification Error", description: errorMessage, variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

     const handleGoogleLoginSuccess = (token, user) => {
        localStorage.setItem('soleVaultToken', token);
        if (user) localStorage.setItem('soleVaultUser', JSON.stringify(user));
        toast({
            title: "Sign In Successful!",
            description: `Welcome, ${user?.firstName || user?.name || 'User'}!`,
        });
        navigate("/dashboard", { replace: true }); 
    };

    const handleGoogleLoginFailure = (error) => {
        toast({
            title: "Google Sign In Error",
            description: error.message || "Could not sign in with Google. Please try again.",
            variant: "destructive",
        });
    };


    return (
        <div className="page-wrapper">
            <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f5] to-[#d4d4d4]">SoleVault</h1>
                    </Link>
                    <p className="text-[#d4d4d4] mt-2">
                        {signupStep === 'form' ? "Create your SoleVault account" : "Verify Your Email"}
                    </p>
                </div>

                {signupStep === 'form' ? (
                    <>
                        {/* --- Traditional Email/Password Form --- */}
                        
                            <Form {...form}>
    <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-0"> {/* Changed space-y-4 to space-y-0 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control} name="firstName" render={({ field }) => ( 
                <FormItem className="mb-4"> {/* ADDED MARGIN */}
                    <FormLabel className="text-[#e5e5e5]">First Name</FormLabel>
                    <FormControl>
                        <Input placeholder="First name" className="bg-[#1f1f1f] border-[#404040] text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                </FormItem> 
            )}/>
            
            <FormField control={form.control} name="lastName" render={({ field }) => ( 
                <FormItem className="mb-4"> {/* ADDED MARGIN */}
                    <FormLabel className="text-[#e5e5e5]">Last Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Last name" className="bg-[#1f1f1f] border-[#404040] text-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                </FormItem> 
            )}/>
        </div>

        <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="mb-4"> {/* ADDED MARGIN */}
                <FormLabel className="text-[#e5e5e5]">Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="your@email.com" className="bg-[#1f1f1f] border-[#404040] text-white" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
            </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem className="mb-4"> {/* ADDED MARGIN */}
                <FormLabel className="text-[#e5e5e5]">Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Create a password" className="bg-[#1f1f1f] border-[#404040] text-white" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
            </FormItem>
        )} />

        <FormField control={form.control} name="confirmPassword" render={({ field }) => (
            <FormItem className="mb-4"> {/* ADDED MARGIN */}
                <FormLabel className="text-[#e5e5e5]">Confirm Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Confirm your password" className="bg-[#1f1f1f] border-[#404040] text-white" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
            </FormItem>
        )} />

        <CustomButton type="submit" className="w-full bg-gradient-to-r from-[#374151] to-[#1f2937] hover:from-[#4b5563] hover:to-[#374151] text-[#ffffff] font-semibold py-3 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:ring-opacity-50 disabled:opacity-50"> {/* Added padding-top */}
            <span>{isSubmitting ? "Sending OTP..." : "Create Account"}</span>
        </CustomButton>
    </form>
</Form>

 <div className="my-6 flex items-center">
                            <div className="flex-grow border-t border-[#404040]"></div>
                            <span className="mx-4 text-xs uppercase text-[#a3a3a3]">Or sign up with</span>
                            <div className="flex-grow border-t border-[#404040]"></div>
                        </div>

                        <div className="flex justify-center">
                            <GoogleLoginButton 
                                onSuccess={(appData) => handleGoogleLoginSuccess(appData.token, appData.user)}
                                onFailure={handleGoogleLoginFailure} 
                            />
                        </div>
    

            
                    </>
                ) : (
                    <>
                        {/* --- OTP Verification Form --- */}
                        <div className="text-center">
                            <p className="text-[#d4d4d4] mb-4">Enter the 6-digit code sent to <strong>{userEmail}</strong>.</p>
                            <form onSubmit={onOtpSubmit} className="space-y-4">
                                <Input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="------"
                                    maxLength="6"
                                    className="bg-[#1f1f1f] border-[#404040] text-white placeholder:text-gray-500 text-center tracking-[0.5em] text-2xl font-mono"
                                />
                                <CustomButton type="submit" className="w-full" disabled={isSubmitting}>
                                    <span>{isSubmitting ? "Verifying..." : "Verify & Create Account"}</span>
                                </CustomButton>
                            </form>
                        </div>
                    </>
                )}

                <p className="mt-8 text-center text-sm text-[#a3a3a3]">
                    Already have an account?{" "}
                    <Link to="/signin" className="font-medium text-[#e5e5e5] hover:text-white hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;






