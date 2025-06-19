// src/pages/AboutPage.jsx

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Target, Users, BarChart3, ShieldCheck } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* --- Hero Section --- */}
                <div className="text-center py-20 px-4 bg-gradient-to-b from-[#1c1c1c] to-black">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-400">
                        About SoleVault
                    </h1>
                    {/* CORRECTED: Changed text-neutral-300 to text-white */}
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-white">
                        The ultimate platform for sneaker collectors, investors, and enthusiasts.
                    </p>
                </div>

                {/* --- Mission & Story Section --- */}
                <div className="container mx-auto px-6 py-16 max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <Target size={40} className="text-blue-400 mb-4" />
                            <h2 className="text-3xl font-bold text-white mb-3">Our Mission</h2>
                            {/* CORRECTED: Changed text-neutral-400 to text-white */}
                            <p className="text-white leading-relaxed">
                                Our mission is to provide the most accurate market data, the most intuitive collection management tools, and a vibrant community space for everyone from the casual collector to the seasoned investor.
                            </p>
                        </div>
                        <div className="bg-[#171717] p-6 rounded-lg border border-[#404040]">
                             <h3 className="text-2xl font-bold text-white mb-3">Our Story</h3>
                            {/* CORRECTED: Changed text-neutral-400 to text-white */}
                            <p className="text-white leading-relaxed">
                                SoleVault was born from a passion for sneaker culture. We wanted to create a single place where enthusiasts could not only manage and track the value of their collection but also connect with a community that shares their love for sneakers.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- Our Values Section --- */}
                <div className="bg-[#1c1c1c] py-20">
                    <div className="container mx-auto px-6 text-center max-w-5xl">
                        <h2 className="text-4xl font-bold text-white mb-12">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Value 1 */}
                            <div className="flex flex-col items-center">
                                <div className="bg-blue-500/10 p-4 rounded-full border border-blue-500/30 mb-4">
                                    <ShieldCheck size={32} className="text-blue-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Authenticity</h3>
                                {/* CORRECTED: Changed text-neutral-400 to text-white */}
                                <p className="text-white text-center">
                                    We are committed to providing genuine data and fostering a trustworthy environment.
                                </p>
                            </div>
                            {/* Value 2 */}
                            <div className="flex flex-col items-center">
                                <div className="bg-green-500/10 p-4 rounded-full border border-green-500/30 mb-4">
                                    <Users size={32} className="text-green-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Community</h3>
                                {/* CORRECTED: Changed text-neutral-400 to text-white */}
                                <p className="text-white text-center">
                                    We believe in the power of connection and shared passion to enrich the culture.
                                </p>
                            </div>
                            {/* Value 3 */}
                            <div className="flex flex-col items-center">
                                <div className="bg-purple-500/10 p-4 rounded-full border border-purple-500/30 mb-4">
                                    <BarChart3 size={32} className="text-purple-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Data-Driven Insights</h3>
                                {/* CORRECTED: Changed text-neutral-400 to text-white */}
                                <p className="text-white text-center">
                                    Empowering our users with the analytics they need to make informed decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;