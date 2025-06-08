import React, { useState } from "react"; // Make sure to import useState
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

// Zod schema remains the same for the initial form
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

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children; 
  }
}

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // --- New State for OTP Flow ---
  const [signupStep, setSignupStep] = useState('form'); // 'form' or 'otp'
  const [userEmail, setUserEmail] = useState(''); // To remember the email for the OTP step
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ---

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // --- Function for Step 1: Submitting the main form ---
  const onFormSubmit = async (data) => {
    setIsSubmitting(true);
    setUserEmail(data.email); // Store email for the next step

    try {
      // Call the new endpoint to send the OTP
      await axios.post(`${API_BASE_URL}/auth/send-otp`, data);
      
      toast({
        title: "OTP Sent!",
        description: `A verification code has been sent to ${data.email}.`,
      });
      
      // Switch the view to the OTP entry form
      setSignupStep('otp');

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to send OTP. Please try again.";
      toast({
        title: "Sign Up Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Function for Step 2: Submitting the OTP ---
  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!otp || otp.length !== 6) {
        toast({ title: "Invalid OTP", description: "Please enter a valid 6-digit OTP.", variant: "destructive" });
        setIsSubmitting(false);
        return;
    }

    try {
      // Call the new endpoint to verify the OTP and create the user
      const response = await axios.post(`${API_BASE_URL}/auth/verify-signup`, { email: userEmail, otp });

      // --- CORRECTED ---
      // The backend no longer sends a token here.
      // We will show a success message and redirect to the signin page.
      
      toast({
        title: "Verification Successful!",
        description: "Your account has been created. Please sign in to continue.",
      });
      
      // Navigate to the sign-in page
      navigate("/signin");


    } catch (error) {
      const errorMessage = error.response?.data?.message || "Verification failed. Please try again.";
      toast({
        title: "OTP Verification Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <ErrorBoundary>
      <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}> 
        <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-md p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f5] to-[#d4d4d4]">
                SoleVault
              </h1>
            </Link>
            <p className="text-[#d4d4d4] mt-2">
              {signupStep === 'form' ? "Create your SoleVault account" : "Verify Your Email"}
            </p>
          </div>

          {/* --- Step 1: Show Signup Form --- */}
          {signupStep === 'form' && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="firstName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#e5e5e5]">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#262626] focus:ring-[#6b7280] rounded-md" {...field} />
                      </FormControl>
                      <FormMessage className="text-[#f87171]" />
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="lastName" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#e5e5e5]">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#262626] focus:ring-[#6b7280] rounded-md" {...field} />
                      </FormControl>
                      <FormMessage className="text-[#f87171]" />
                    </FormItem>
                  )}/>
                </div>
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e5e5e5]">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#262626] focus:ring-[#6b7280] rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#f87171]" />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e5e5e5]">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#262626] focus:ring-[#6b7280] rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#f87171]" />
                  </FormItem>
                )}/>
                <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e5e5e5]">Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#262626] focus:ring-[#6b7280] rounded-md" {...field} />
                    </FormControl>
                    <FormMessage className="text-[#f87171]" />
                  </FormItem>
                )}/>

                <CustomButton type="submit" className="w-full bg-gradient-to-r from-[#374151] to-[#1f2937] hover:from-[#4b5563] hover:to-[#374151] text-[#ffffff] font-semibold py-3 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-[#262626] focus:ring-[#6b7280] focus:ring-opacity-50 disabled:opacity-50" disabled={isSubmitting}>
                  <span>{isSubmitting ? "Sending OTP..." : "Create Account"}</span>
                </CustomButton>
              </form>
            </Form>
          )}

          {/* --- Step 2: Show OTP Form --- */}
          {signupStep === 'otp' && (
            <div className="text-center">
              <p className="text-[#d4d4d4] mb-4">
                Enter the 6-digit code sent to <strong>{userEmail}</strong>.
              </p>
              <form onSubmit={onOtpSubmit} className="space-y-4">
                <Input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="------"
                  maxLength="6"
                  className="bg-[#1f1f1f] border-[#404040] text-white placeholder:text-gray-500 text-center tracking-[0.5em] text-2xl font-mono rounded-md"
                />
                <CustomButton type="submit" className="w-full bg-gradient-to-r from-[#374151] to-[#1f2937] hover:from-[#4b5563] hover:to-[#374151] text-[#ffffff] font-semibold py-3 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-[#262626] focus:ring-[#6b7280] focus:ring-opacity-50 disabled:opacity-50" disabled={isSubmitting}>
                  <span>{isSubmitting ? "Verifying..." : "Verify & Create Account"}</span>
                </CustomButton>
              </form>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-[#a3a3a3]">
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-[#e5e5e5] hover:text-[#ffffff] hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default SignUp;
