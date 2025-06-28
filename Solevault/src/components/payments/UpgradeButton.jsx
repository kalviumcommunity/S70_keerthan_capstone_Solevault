import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

const UpgradeButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgradeClick = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('soleVaultToken');
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/payments/create-checkout-session`,
                {}, // No body needed for this request
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const { url } = response.data;
            // Redirect the user to the Stripe Checkout page
            window.location.href = url;

        } catch (error) {
            console.error("Failed to create checkout session:", error);
            // You would show a toast message here
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleUpgradeClick} disabled={isLoading}>
            <Zap className="mr-2 h-4 w-4" />
            {isLoading ? 'Redirecting...' : 'Upgrade to Pro'}
        </Button>
    );
};

export default UpgradeButton;