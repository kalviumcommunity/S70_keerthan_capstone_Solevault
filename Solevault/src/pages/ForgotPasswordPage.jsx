import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import CustomButton from '@/components/ui/CustomButton';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, { email });
            toast({
                title: 'Check Your Email',
                description: response.data.message,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to send reset link. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="bg-[#262626] border border-[#404040] rounded-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center text-white mb-2">Forgot Password</h1>
                <p className="text-center text-neutral-400 mb-6">Enter your email to receive a password reset link.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="bg-[#1f1f1f] border-[#404040] text-white"
                    />
                    <CustomButton type="submit" className="w-full" disabled={isSubmitting}>
                        <span>{isSubmitting ? 'Sending...' : 'Send Reset Link'}</span>
                    </CustomButton>
                </form>
                 <p className="mt-6 text-center text-sm text-[#a3a3a3]">
                    Remembered your password?{" "}
                    <Link to="/signin" className="font-medium text-[#e5e5e5] hover:text-white hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;