import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/ui/CustomButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

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

  const onSubmit = async (data) => {
    try {
      console.log("Sign up attempt:", data);
      
      toast({
        title: "Account Created!",
        description: "Your account has been created successfully.",
      });
      
      navigate("/signin");
    } catch (error) {
      console.error("Sign up error:", error);
      toast({
        title: "Error",
        description: "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center px-4 py-8"> {/* Replaced bg-black */}
      <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#f5f5f5] to-[#d4d4d4]">
              SoleVault
            </h1>
          </Link>
          <p className="text-[#d4d4d4] mt-2">Create your SoleVault account</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e5e5e5]">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md"
                        // Replaced text-white, placeholder-gray-500, focus:ring-offset-black, focus:ring-gray-500
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#f87171]" /> {/* Replaced text-red-400 */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[#e5e5e5]">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md"
                        // Replaced text-white, placeholder-gray-500, focus:ring-offset-black, focus:ring-gray-500
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[#f87171]" /> {/* Replaced text-red-400 */}
                  </FormItem>
                )}
              />
            </div>
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
                      className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md"
                      // Replaced text-white, placeholder-gray-500, focus:ring-offset-black, focus:ring-gray-500
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#f87171]" /> {/* Replaced text-red-400 */}
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
                      placeholder="Create a password"
                      className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md"
                      // Replaced text-white, placeholder-gray-500, focus:ring-offset-black, focus:ring-gray-500
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#f87171]" /> {/* Replaced text-red-400 */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#e5e5e5]">Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm your password"
                      className="bg-[#1f1f1f] border-[#404040] text-[#ffffff] placeholder:text-[#6b7280] focus:ring-offset-[#000000] focus:ring-[#6b7280] rounded-md"
                      // Replaced text-white, placeholder-gray-500, focus:ring-offset-black, focus:ring-gray-500
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#f87171]" /> {/* Replaced text-red-400 */}
                </FormItem>
              )}
            />
            <CustomButton 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#374151] to-[#1f2937] hover:from-[#4b5563] hover:to-[#374151] text-[#ffffff] font-semibold py-3 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:ring-opacity-50 disabled:opacity-50"
              // Replaced from-gray-700, to-gray-800, hover:from-gray-600, hover:to-gray-700, text-white, focus:ring-gray-500
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating Account..." : "Create Account"}
            </CustomButton>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-[#a3a3a3]">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-[#e5e5e5] hover:text-[#ffffff] hover:underline"> {/* Replaced hover:text-white */}
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;