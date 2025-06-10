// src/pages/AboutPage.jsx

import React from 'react';
import Navbar from '@/components/layout/Navbar'; // Assuming you want the Navbar and Footer
import Footer from '@/components/layout/Footer';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center">About SoleVault</h1>
                    <p className="text-lg text-neutral-300 mb-6 text-center">
                        The ultimate platform for sneaker collectors, investors, and enthusiasts.
                    </p>
                    <div className="prose prose-invert lg:prose-xl text-neutral-400 space-y-4">
                        <p>
                            SoleVault was born from a passion for sneaker culture. We wanted to create a single place where enthusiasts could not only manage and track the value of their collection but also connect with a community that shares their love for sneakers.
                        </p>
                        <p>
                            Our mission is to provide the most accurate market data, the most intuitive collection management tools, and a vibrant community space for everyone from the casual collector to the seasoned investor.
                        </p>
                        <h2 className="text-2xl font-semibold text-white text-center">Our Values</h2>
                        <ul className='text-center'>
                            <li>Authenticity</li>
                            <li>Community</li>
                            <li>Data-Driven Insights</li>
                        </ul>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AboutPage;
