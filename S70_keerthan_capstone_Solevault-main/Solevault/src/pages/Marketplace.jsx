import React from "react";
import { Link } from "react-router-dom"; // Link is imported but not used in the provided snippet. Keeping it for completeness if it was intended for future use.
import { Search, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar"; // Assumed to be hex-coded
import Footer from "@/components/layout/Footer";   // Assumed to be hex-coded
import { Input } from "@/components/ui/input";     // Assumed to be hex-coded internally
import { Button } from "@/components/ui/button";   // Assumed to be hex-coded internally for variants

const marketplaceItems = [
  {
    id: 1,
    name: "Nike Air Jordan 1 High",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Adidas Yeezy Boost 350",
    price: 249.99,
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Nike Air Max 90",
    price: 179.99,
    image:
      "https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&q=80",
  },
];

const Marketplace = () => {
  return (
    <div className="min-h-screen bg-[#000000]"> {/* Replaced bg-black */}
      <Navbar />
      <main className="solevault-container py-8"> {/* Kept solevault-container */}
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#ffffff]">Marketplace</h1> {/* Replaced text-white */}
            <div className="relative w-64">
              <Input
                type="search"
                placeholder="Search sneakers..."
                className="pl-10 bg-[#1a1a1a] border-[#262626] text-[#ffffff]"
                // Replaced bg-solevault-800, border-solevault-700, text-white
                // Note: Input component itself already has 'border' class, this sets the color.
                aria-label="Search sneakers"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#999999]" /> {/* Replaced text-solevault-400 */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketplaceItems.map((item) => (
              <div key={item.id} className="bg-[#1a1a1a] p-4"> {/* Replaced solevault-card */}
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-semibold text-[#fafafa] mb-2"> {/* Replaced text-solevault-100 */}
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-[#999999]">${item.price}</span> {/* Replaced text-solevault-300 */}
                  <Button aria-label={`Buy ${item.name}`}>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Buy Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;