import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, Search } from "lucide-react";
import Navbar from "@/components/layout/Navbar"; // Assumed hex-coded
import Footer from "@/components/layout/Footer";   // Assumed hex-coded
import CustomButton from "@/components/ui/CustomButton"; // Assumed hex-coded

const Index = () => {
  return (
    <div className="min-h-screen bg-[#000000] flex flex-col"> {/* Replaced bg-black */}
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#121212] to-[#000000] z-0"></div> {/* Replaced from-solevault-900, to-black */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1588099768531-a72d4a198538?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}></div>
          
          <div className="solevault-container relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 solevault-gradient-text"> {/* solevault-gradient-text is custom */}
                Track, Manage, and Grow Your Sneaker Collection
              </h1>
              <p className="text-[#999999] text-lg mb-8 md:pr-12"> {/* Replaced text-solevault-300 */}
                SoleVault is the ultimate platform for sneaker enthusiasts to track collection value, authenticate pairs, and connect with the community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/dashboard">
                  <CustomButton size="lg">Get Started</CustomButton>
                </Link>
                <Link to="/marketplace">
                  <CustomButton size="lg" variant="outline">Explore Marketplace</CustomButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-[#121212]"> {/* Replaced bg-solevault-900 */}
          <div className="solevault-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 solevault-gradient-text">Everything Your Collection Deserves</h2> {/* solevault-gradient-text is custom */}
              <p className="text-[#999999] max-w-2xl mx-auto"> {/* Replaced text-solevault-400 */}
                SoleVault combines collection management, market analytics, authentication, and community features in one seamless platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#1a1a1a] p-6"> {/* Replaced solevault-card */}
                <div className="w-12 h-12 bg-[#212121]/20 rounded-lg flex items-center justify-center mb-4"> {/* Replaced bg-solevault-accent/20 */}
                  <TrendingUp size={24} className="text-[#212121]" /> {/* Replaced text-solevault-accent */}
                </div>
                <h3 className="text-xl font-semibold text-[#fafafa] mb-2">Market Analytics</h3> {/* Replaced text-solevault-100 */}
                <p className="text-[#999999]"> {/* Replaced text-solevault-400 */}
                  Track the value of your collection in real-time with comprehensive market data and investment analytics.
                </p>
              </div>
              
              <div className="bg-[#1a1a1a] p-6"> {/* Replaced solevault-card */}
                <div className="w-12 h-12 bg-[#212121]/20 rounded-lg flex items-center justify-center mb-4"> {/* Replaced bg-solevault-accent/20 */}
                  <Shield size={24} className="text-[#212121]" /> {/* Replaced text-solevault-accent */}
                </div>
                <h3 className="text-xl font-semibold text-[#fafafa] mb-2">Authentication</h3> {/* Replaced text-solevault-100 */}
                <p className="text-[#999999]"> {/* Replaced text-solevault-400 */}
                  Verify the authenticity of your sneakers with our AI-powered authentication tool and expert community.
                </p>
              </div>
              
              <div className="bg-[#1a1a1a] p-6"> {/* Replaced solevault-card */}
                <div className="w-12 h-12 bg-[#212121]/20 rounded-lg flex items-center justify-center mb-4"> {/* Replaced bg-solevault-accent/20 */}
                  <Users size={24} className="text-[#212121]" /> {/* Replaced text-solevault-accent */}
                </div>
                <h3 className="text-xl font-semibold text-[#fafafa] mb-2">Community</h3> {/* Replaced text-solevault-100 */}
                <p className="text-[#999999]"> {/* Replaced text-solevault-400 */}
                  Connect with fellow sneakerheads, share your collection, and stay updated on the latest drops and trends.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Marketplace Teaser */}
        <section className="py-16 bg-[#000000] relative overflow-hidden"> {/* Replaced bg-black */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1579298245158-33e8f568f7d3?auto=format&fit=crop&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}></div>
          
          <div className="solevault-container relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-full lg:w-1/2 order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-4 solevault-gradient-text"> {/* solevault-gradient-text is custom */}
                  Buy, Sell, and Trade with Confidence
                </h2>
                <p className="text-[#999999] mb-6"> {/* Replaced text-solevault-300 */}
                  Our integrated marketplace connects you directly with verified sellers and buyers, eliminating fees and ensuring authenticity.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-[#065f46]/30 rounded-full flex items-center justify-center mr-2 mt-1"> {/* Replaced bg-green-900/30 */}
                      <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#d4d4d4]">Real-time price comparison across major platforms</span> {/* Replaced text-solevault-200 */}
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-[#065f46]/30 rounded-full flex items-center justify-center mr-2 mt-1"> {/* Replaced bg-green-900/30 */}
                      <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#d4d4d4]">Verified seller program with reputation system</span> {/* Replaced text-solevault-200 */}
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 bg-[#065f46]/30 rounded-full flex items-center justify-center mr-2 mt-1"> {/* Replaced bg-green-900/30 */}
                      <svg className="w-4 h-4 text-[#22c55e]" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-[#d4d4d4]">Secure payment processing and escrow service</span> {/* Replaced text-solevault-200 */}
                  </li>
                </ul>
                <Link to="/marketplace">
                  <CustomButton size="lg" className="flex items-center">
                    <Search size={18} className="mr-2" /> Browse Marketplace
                  </CustomButton>
                </Link>
              </div>
              
              <div className="w-full lg:w-1/2 order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-tr from-[#212121] to-[#9333ea] rounded-lg opacity-30 blur-lg animate-pulse-subtle"></div> {/* Replaced from-solevault-accent, to-purple-600 */}
                  <img 
                    src="https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80"
                    alt="Sneaker Marketplace"
                    className="rounded-lg relative z-10 w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 bg-[#121212]"> {/* Replaced bg-solevault-900 */}
          <div className="solevault-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 solevault-gradient-text">Choose Your Plan</h2> {/* solevault-gradient-text is custom */}
              <p className="text-[#999999] max-w-2xl mx-auto"> {/* Replaced text-solevault-400 */}
                Whether you're a casual collector or serious investor, SoleVault has a plan that fits your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <div className="bg-[#1a1a1a] p-6 flex flex-col"> {/* Replaced solevault-card */}
                <h3 className="text-xl font-semibold text-[#fafafa] mb-1">Basic</h3> {/* Replaced text-solevault-100 */}
                <p className="text-[#999999] mb-4">Perfect for casual collectors</p> {/* Replaced text-solevault-400 */}
                <div className="mb-5">
                  <span className="text-3xl font-bold text-[#fafafa]">$0</span> {/* Replaced text-solevault-100 */}
                  <span className="text-[#999999]">/month</span> {/* Replaced text-solevault-400 */}
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Track up to 20 pairs</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Basic market value data</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Community access</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#ef4444] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-red-500 */}
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Authentication services</span> {/* Replaced text-solevault-400 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#ef4444] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-red-500 */}
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Advanced analytics</span> {/* Replaced text-solevault-400 */}
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link to="/signup" className="w-full">
                    <CustomButton variant="outline" className="w-full">Get Started</CustomButton>
                  </Link>
                </div>
              </div>
              
              {/* Pro Plan */}
              <div className="bg-[#1a1a1a] p-6 border-2 border-[#212121] relative flex flex-col"> {/* Replaced solevault-card, border-solevault-accent */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#212121] text-[#ffffff] px-4 py-1 rounded-full text-sm font-medium"> {/* Replaced bg-solevault-accent, text-white */}
                  Most Popular
                </div>
                <h3 className="text-xl font-semibold text-[#fafafa] mb-1">Pro</h3> {/* Replaced text-solevault-100 */}
                <p className="text-[#999999] mb-4">For serious collectors</p> {/* Replaced text-solevault-400 */}
                <div className="mb-5">
                  <span className="text-3xl font-bold text-[#fafafa]">$9.99</span> {/* Replaced text-solevault-100 */}
                  <span className="text-[#999999]">/month</span> {/* Replaced text-solevault-400 */}
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Unlimited collection size</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Advanced market analytics</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Premium community features</span> {/* Replaced text-solevault-300 */}
                  </li>
                   <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">5 free authentications/month</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Ad-free experience</span> {/* Replaced text-solevault-300 */}
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link to="/signup?plan=pro" className="w-full">
                    <CustomButton className="w-full">Get Started</CustomButton>
                  </Link>
                </div>
              </div>
              
              {/* Investor Plan */}
              <div className="bg-[#1a1a1a] p-6 flex flex-col"> {/* Replaced solevault-card */}
                <h3 className="text-xl font-semibold text-[#fafafa] mb-1">Investor</h3> {/* Replaced text-solevault-100 */}
                <p className="text-[#999999] mb-4">For professional resellers</p> {/* Replaced text-solevault-400 */}
                <div className="mb-5">
                  <span className="text-3xl font-bold text-[#fafafa]">$24.99</span> {/* Replaced text-solevault-100 */}
                  <span className="text-[#999999]">/month</span> {/* Replaced text-solevault-400 */}
                </div>
                <ul className="space-y-3 mb-8">
                   <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">All Pro features</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Unlimited authentications</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">AI price predictions</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Priority customer support</span> {/* Replaced text-solevault-300 */}
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-[#22c55e] mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20"> {/* Replaced text-green-500 */}
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#999999]">Early access to new features</span> {/* Replaced text-solevault-300 */}
                  </li>
                </ul>
                <div className="mt-auto">
                  <Link to="/signup?plan=investor" className="w-full">
                    <CustomButton variant="outline" className="w-full">Get Started</CustomButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#1a1a1a] to-[#000000] relative overflow-hidden"> {/* Replaced from-solevault-800, to-black */}
          <div className="absolute inset-0 opacity-20">
            {/* Inline styles with rgba remain as they are not direct theme variable classes */}
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 25% 60%, rgba(255, 77, 0, 0.5) 0%, transparent 50%)",
            }}></div>
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.5) 0%, transparent 50%)",
            }}></div>
          </div>
          
          <div className="solevault-container relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 solevault-gradient-text"> {/* solevault-gradient-text is custom */}
              Ready to Elevate Your Sneaker Game?
            </h2>
            <p className="text-[#999999] text-lg mb-8 max-w-2xl mx-auto"> {/* Replaced text-solevault-300 */}
              Join thousands of sneaker enthusiasts who trust SoleVault to manage, track, and grow their collections.
            </p>
            <Link to="/signup">
              <CustomButton size="lg" className="px-8">
                Get Started For Free
              </CustomButton>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;