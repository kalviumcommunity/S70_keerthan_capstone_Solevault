import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import CustomButton from '@/components/ui/CustomButton';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { token } = useParams(); // Gets the token from the URL

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            toast({ title: 'Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
            return;
        }
        if (password !== confirmPassword) {
            toast({ title: 'Error', description: "Passwords do not match.", variant: 'destructive' });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/reset-password/${token}`, { password });
            toast({
                title: 'Success!',
                description: response.data.message,
            });
            navigate('/signin');
        } catch (error) {
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to reset password.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="bg-[#262626] border border-[#404040] rounded-lg w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-center text-white mb-6">Set a New Password</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                        className="bg-[#1f1f1f] border-[#404040] text-white"
                    />
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                        className="bg-[#1f1f1f] border-[#404040] text-white"
                    />
                    <CustomButton type="submit" className="w-full" disabled={isSubmitting}>
                        <span>{isSubmitting ? 'Resetting...' : 'Reset Password'}</span>
                    </CustomButton>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;