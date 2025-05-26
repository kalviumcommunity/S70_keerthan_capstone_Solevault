import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import axios from 'axios'; // <<--- 1. Import axios

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // 2. Define API_BASE_URL (ensure your .env file is set up correctly)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Implement the onSubmit function
  const onSubmit = async (data) => {
    // data will contain { email, password }
    try {
      console.log("Sign in attempt:", data);

      // Determine the correct endpoint path based on your VITE_API_BASE_URL setup
      // Option A: If VITE_API_BASE_URL is like "http://localhost:8000/auth"
      // const signInEndpoint = `${API_BASE_URL}/signin`;
      // Option B: If VITE_API_BASE_URL is like "http://localhost:8000"
      // const signInEndpoint = `${API_BASE_URL}/auth/signin`;

      // **Choose the option that matches your working signup configuration**
      // Let's assume Option B is more standard for a base URL, adjust if needed:
      const signInEndpoint = `${API_BASE_URL}/auth/signin`; // <<--- ADJUST THIS PATH if your VITE_API_BASE_URL already contains /auth


      const response = await axios.post(signInEndpoint, {
        email: data.email,
        password: data.password,
      });

      console.log("Sign in successful:", response.data);

      // The backend (without JWTs for now) sends back:
      // { message: 'Logged in successfully!', user: { id, firstName, lastName, email } }
      
      toast({
        title: "Sign In Successful!",
        description: `Welcome back, ${response.data.user.firstName || 'User'}!`, // Use firstName if available
      });
      
      // Here you might want to store user info in a global state (Context, Redux, Zustand)
      // or localStorage if you need to access it elsewhere in the app.
      // For example:
      // localStorage.setItem('soleVaultUser', JSON.stringify(response.data.user));

      navigate("/dashboard"); // Or any other page you want to redirect to after login

    } catch (error) {
      console.error("Sign in error:", error);
      let errorMessage = "Failed to sign in. Please check your credentials.";
      
      if (error.response && error.response.data && error.response.data.message) {
        // Use the error message from the backend if available
        errorMessage = error.response.data.message;
      }
      // No specific check for error.response.status === 404 here, 
      // as "Invalid credentials" (400/401) is more common for sign-in failures.
      // A 404 would mean the /auth/signin endpoint itself wasn't found, which should be fixed.
      
      toast({
        title: "Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="page-wrapper"> {/* Replaced bg-black */}
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