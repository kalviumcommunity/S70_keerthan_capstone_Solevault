import React from "react";
import Navbar from "@/components/layout/Navbar"; // Assumed to be hex-coded
import Footer from "@/components/layout/Footer";   // Assumed to be hex-coded
import CommunityFeed from "@/components/community/CommunityFeed"; // Assumed to be hex-coded
import { Button } from "@/components/ui/button"; // Assumed to be hex-coded internally for variants
import { UserPlus } from "lucide-react";

const Community = () => {
  return (
    <div className="min-h-screen bg-[#000000]"> {/* Replaced bg-black */}
      <Navbar />
      <main className="solevault-container py-8" role="main"> {/* Kept solevault-container */}
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#ffffff]">Sneaker Community</h1> {/* Replaced text-white */}
            <Button variant="outline" className="text-[#fafafa]" aria-label="Join the Sneaker Community"> {/* Replaced text-solevault-100 */}
              <UserPlus className="mr-2 h-4 w-4" />
              Join Community
            </Button>
          </div>
          <CommunityFeed />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Community;