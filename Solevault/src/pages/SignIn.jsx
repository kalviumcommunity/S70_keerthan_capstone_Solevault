// SignIn.jsx
import React from "react";
// Make sure useLocation is imported from react-router-dom
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios';

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation(); // <<--- 1. Get the location object
  const { toast } = useToast();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // 2. Determine where to redirect after login
  // If 'from' state exists (passed by ProtectedRoute), use its pathname.
  // Otherwise, default to '/dashboard'.
  const from = location.state?.from?.pathname || "/dashboard";

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Sign in attempt:", data);
      const signInEndpoint = `${API_BASE_URL}/auth/signin`; 

      const response = await axios.post(signInEndpoint, {
        email: data.email,
        password: data.password,
      });

      console.log("Sign in successful:", response.data);

      if (response.data && response.data.token && response.data.user) {
        localStorage.setItem('soleVaultToken', response.data.token); 
        localStorage.setItem('soleVaultUser', JSON.stringify(response.data.user)); 

        toast({
          title: "Sign In Successful!",
          description: `Welcome back, ${response.data.user.firstName || 'User'}!`,
        });
        
        // 3. Navigate to the 'from' location (original target or dashboard)
        navigate(from, { replace: true }); // Use replace to avoid login page in history

      } else {
        console.error("Sign in response did not include token or user data:", response.data);
        toast({
          title: "Sign In Error",
          description: "Received an unexpected response from the server.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error("Sign in error:", error);
      let errorMessage = "Failed to sign in. Please check your credentials.";
      
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      
      toast({
        title: "Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    // Your existing JSX for the SignIn form...
    <div className="page-wrapper">
      <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f5] to-[#d4d4d4]">
              SoleVault
            </h1>
          </Link>
          <p className="text-[#d4d4d4] mt-2">Welcome back to SoleVault</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e5e5e5]">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md py-2 px-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#f87171] text-xs mt-1" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e5e5e5]">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md py-2 px-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#f87171] text-xs mt-1" />
                </FormItem>
              )}
            />

            <div className="text-right text-sm">
    <Link to="/forgot-password" className="font-medium text-neutral-400 hover:text-white hover:underline">
        Forgot Password?
    </Link>
</div>
            <CustomButton 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#374151] to-[#1f2937] hover:from-[#4b5563] hover:to-[#374151] text-[#ffffff] font-semibold py-3 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:ring-opacity-50 disabled:opacity-50"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing In..." : "Sign In"}
            </CustomButton>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-[#a3a3a3]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-[#e5e5e5] hover:text-[#ffffff] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;