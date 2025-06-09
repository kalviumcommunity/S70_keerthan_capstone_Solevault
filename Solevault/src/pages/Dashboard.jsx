import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CollectionGrid from "@/components/dashboard/CollectionGrid";
import MarketAnalytics from "@/components/marketplace/MarketAnalytics";
import CommunityFeed from "@/components/community/CommunityFeed";
import CustomButton from "@/components/ui/CustomButton";
import AddPairModal from "@/components/dashboard/AddPairModal";
import EditPairModal from "@/components/dashboard/EditPairModal";
import DeletePairModal from "@/components/dashboard/DeletePairModal";
import SneakerDetailsModal from "@/components/dashboard/SneakerDetailsModal"; // 1. Import the new modal
import { Filter, BarChart2, GridIcon, AlertTriangle, Loader2 } from "lucide-react";

// Import service functions
import { 
  fetchUserSneakers, 
  addSneaker as apiAddSneaker,
  updateSneaker as apiUpdateSneaker,
  deleteSneaker as apiDeleteSneaker
} from "@/services/sneakerService"; // Adjust path if your service file is elsewhere

const Dashboard = () => {
  const [sneakers, setSneakers] = useState([]); 
  const [editingSneaker, setEditingSneaker] = useState(null);
  const [deletingSneaker, setDeletingSneaker] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
   const [viewingSneaker, setViewingSneaker] = useState(null); // 2. Add new state for viewing details

  useEffect(() => {
    const loadSneakers = async () => {
      setIsLoading(true);
      setError(null);
      console.log("DEBUG: Attempting to fetch user sneakers...");
      try {
        const data = await fetchUserSneakers();
        console.log("DEBUG: Sneakers fetched successfully:", data);
        setSneakers(data || []);
      } catch (err) {
        console.error("Failed to fetch sneakers:", err);
        setError(err.message || "Failed to load sneakers.");
        setSneakers([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadSneakers();
  }, []);

  const handleAddPair = async (newSneakerDataFromModal) => {
    console.log("DEBUG HAP: Data received from AddModal:", JSON.parse(JSON.stringify(newSneakerDataFromModal)));
    setIsSubmitting(true);
    setError(null);
    try {
      const payloadForAPI = {
        name: newSneakerDataFromModal.name,
        brand: newSneakerDataFromModal.brand,
        model: newSneakerDataFromModal.model,
        releaseDate: newSneakerDataFromModal.purchaseDate, // From AddModal's form
        retailPrice: parseFloat(newSneakerDataFromModal.price), // From AddModal's form
        marketValue: parseFloat(newSneakerDataFromModal.marketValue),
        image: newSneakerDataFromModal.image,
        description: newSneakerDataFromModal.description,
      };
      console.log("DEBUG HAP: Payload for API:", JSON.parse(JSON.stringify(payloadForAPI)));
      const addedSneaker = await apiAddSneaker(payloadForAPI);
      setSneakers(prev => [addedSneaker, ...prev]);
      console.log("DEBUG HAP: Added new sneaker via API (SUCCESS):", addedSneaker);
    } catch (err) {
      console.error("Failed to add sneaker:", err);
      setError(err.message || "Failed to add sneaker.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSneaker = (id) => {
    console.log("DEBUG HES: handleEditSneaker CALLED with ID:", id);
    const sneaker = sneakers.find(s => s.id === id || s._id === id);
    if (sneaker) {
      console.log("DEBUG HES: Found sneaker, calling setEditingSneaker with:", JSON.parse(JSON.stringify(sneaker)));
      setEditingSneaker(sneaker);
    } else {
      console.error("DEBUG HES: Sneaker NOT found for edit with ID:", id);
      setError("Could not find sneaker to edit.");
    }
  };

  const handleUpdatePair = async (updatedSneakerDataFromModal) => {
    console.log("DEBUG HUP: 1. Data received from EditModal:", updatedSneakerDataFromModal);
    console.log("DEBUG HUP: 1. Data received from EditModal:", JSON.parse(JSON.stringify(updatedSneakerDataFromModal)));
    setIsSubmitting(true);
    setError(null);
    try {
      const sneakerId = updatedSneakerDataFromModal.id || updatedSneakerDataFromModal._id;
      if (!sneakerId) {
        console.error("DEBUG HUP ERROR: sneakerId is missing from updatedSneakerDataFromModal", updatedSneakerDataFromModal);
        setError("Cannot update sneaker: ID is missing.");
        setIsSubmitting(false);
        return;
      }
      
      const payload = {
        name: updatedSneakerDataFromModal.name,
        brand: updatedSneakerDataFromModal.brand,
        model: updatedSneakerDataFromModal.model,
        releaseDate: updatedSneakerDataFromModal.releaseDate, 
        retailPrice: parseFloat(updatedSneakerDataFromModal.retailPrice),
        marketValue: parseFloat(updatedSneakerDataFromModal.marketValue),
        image: updatedSneakerDataFromModal.image,
        description: updatedSneakerDataFromModal.description,
      };
  // --- ADD THIS CONSOLE.LOG ---
        console.log("DEBUG HUP: 2. Payload being sent to backend for update:", payload);

      console.log("DEBUG HUP: 2. Payload for API:", JSON.parse(JSON.stringify(payload)));
      console.log("DEBUG HUP: 3. Sneaker ID for API update:", sneakerId);

      const updatedSneakerFromAPI = await apiUpdateSneaker(sneakerId, payload);
      console.log("DEBUG HUP: 4. Response from API (updatedSneakerFromAPI):", JSON.parse(JSON.stringify(updatedSneakerFromAPI)));

      setSneakers(prevSneakers => {
        console.log("DEBUG HUP: 5. Previous sneakers state:", JSON.parse(JSON.stringify(prevSneakers)));
        const nextSneakers = prevSneakers.map(s => {
          const currentSneakerId = s.id || s._id;
          if (currentSneakerId === sneakerId) {
            console.log(`DEBUG HUP: Updating sneaker in map - Matched ID: ${currentSneakerId}. Replacing with API response.`);
            return updatedSneakerFromAPI; 
          }
          return s;
        });
        console.log("DEBUG HUP: 6. Next sneakers state (after map):", JSON.parse(JSON.stringify(nextSneakers)));
        return nextSneakers;
      });

      setEditingSneaker(null);
      console.log("DEBUG HUP: 7. Update presumed successful, editingSneaker set to null.");
    } catch (err) {
      console.error("Failed to update sneaker:", err);
      setError(err.message || "Failed to update sneaker.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteSneakerRequest = (id) => {
    console.log("DEBUG HDSR: handleDeleteSneakerRequest CALLED with ID:", id);
    const sneaker = sneakers.find(s => s.id === id || s._id === id);
    if (sneaker) {
      console.log("DEBUG HDSR: Found sneaker, calling setDeletingSneaker with:", JSON.parse(JSON.stringify(sneaker)));
      setDeletingSneaker(sneaker);
    } else {
      console.error("DEBUG HDSR: Sneaker NOT found for delete request with ID:", id);
      setError("Could not find sneaker to delete.");
    }
  };

  const handleConfirmDeletePair = async (idToDelete) => {
    console.log("DEBUG HCDP: Dashboard's handleConfirmDeletePair CALLED for ID:", idToDelete);
    setIsSubmitting(true);
    setError(null);
    try {
      console.log("DEBUG HCDP: Attempting to delete sneaker via API. ID:", idToDelete);
      await apiDeleteSneaker(idToDelete);
      setSneakers(prev => prev.filter(s => (s.id !== idToDelete && s._id !== idToDelete)));
      setDeletingSneaker(null);
      console.log("DEBUG HCDP: Deleted sneaker with id via API (SUCCESS):", idToDelete);
    } catch (err) {
      console.error("Failed to delete sneaker:", err);
      setError(err.message || "Failed to delete sneaker.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const collectionSize = sneakers.length;
  const totalRetailValue = sneakers.reduce((sum, sneaker) => sum + (sneaker.retailPrice || 0), 0);
  const totalMarketValue = sneakers.reduce((sum, sneaker) => sum + (sneaker.marketValue || 0), 0);
  const overallROI = totalRetailValue > 0 ? ((totalMarketValue - totalRetailValue) / totalRetailValue * 100) : 0;

  // Log sneaker IDs just before rendering CollectionGrid to check for duplicates causing key warnings
  useEffect(() => {
    if (sneakers.length > 0) {
      const sneakerIds = sneakers.map(s => s._id || s.id || `index-${Math.random()}`); // Add fallback for logging
      const uniqueIds = new Set(sneakerIds);
      if (uniqueIds.size !== sneakerIds.length) {
        const duplicateIds = sneakerIds.filter((id, index) => sneakerIds.indexOf(id) !== index);
        console.error("ERROR IN DASHBOARD: Duplicate IDs detected in sneakers state just before render! Duplicates:", duplicateIds);
      }
    }
  }, [sneakers]);


  if (isLoading && !sneakers.length) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <Loader2 className="h-12 w-12 animate-spin text-[#f5f5f5]" />
        <p className="mt-4 text-lg">Loading your collection...</p>
      </div>
    );
  }


    // 3. Add a new handler function to set the sneaker to be viewed
    const handleViewDetails = (sneakerId) => {
        const sneaker = sneakers.find(s => s.id === sneakerId || s._id === sneakerId);
         // --- ADD THIS CONSOLE.LOG to see the data ---
    console.log("DEBUG: Data for sneaker being viewed:", sneaker);
        if (sneaker) {
            setViewingSneaker(sneaker);
        }
    };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Navbar />
      <main className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-4 p-4 bg-red-900/30 border border-red-700 text-red-400 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle size={20} className="mr-3" />
                <p>Error: {error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300 font-bold">X</button>
            </div>
          )}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#f5f5f5] mb-2">Your Collection</h1>
            <p className="text-[#a3a3a3]">Manage and track your sneaker inventory</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg p-4">
              <p className="text-[#a3a3a3] text-sm mb-1">Collection Size</p>
              <p className="text-2xl font-bold text-[#f5f5f5]">{collectionSize} Pairs</p>
            </div>
            <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg p-4">
              <p className="text-[#a3a3a3] text-sm mb-1">Total Retail Value</p>
              <p className="text-2xl font-bold text-[#f5f5f5]">${totalRetailValue.toLocaleString()}</p>
            </div>
            <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg p-4">
              <p className="text-[#a3a3a3] text-sm mb-1">Market Value</p>
              <p className="text-2xl font-bold text-[#f5f5f5]">${totalMarketValue.toLocaleString()}</p>
            </div>
            <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg p-4">
              <p className="text-[#a3a3a3] text-sm mb-1">Overall ROI</p>
              <p className={`text-2xl font-bold ${overallROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {overallROI >= 0 ? '+' : ''}{overallROI.toFixed(1)}%
              </p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-[#f5f5f5]">Recent Sneakers</h2>
                <div className="flex items-center space-x-2">
                  <CustomButton size="sm" variant="outline" className="flex items-center border-[#525252] text-[#d4d4d4] hover:bg-[#171717] hover:text-white">
                    <Filter size={16} className="mr-1" /> Filter
                  </CustomButton>
                  <AddPairModal onAddPair={handleAddPair} 
                  isSubmitting={isSubmitting}/>
                  <div className="hidden sm:flex bg-[#1a1a1a] rounded-md overflow-hidden">
                    <button 
                      type="button"
                      onClick={() => setViewMode("grid")}
                      aria-pressed={viewMode === "grid"}
                      className={`p-2 transition-colors ${viewMode === "grid" ? "bg-[#404040] text-[#f5f5f5]" : "text-[#a3a3a3] hover:bg-[#262626]"}`}
                    >
                      <GridIcon size={18} />
                    </button>
                    <button 
                      type="button"
                      onClick={() => setViewMode("chart")}
                      aria-pressed={viewMode === "chart"}
                      className={`p-2 transition-colors ${viewMode === "chart" ? "bg-[#404040] text-[#f5f5f5]" : "text-[#a3a3a3] hover:bg-[#262626]"}`}
                    >
                      <BarChart2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <CollectionGrid 
                className="mb-8" 
                sneakers={sneakers}
                onEditSneaker={handleEditSneaker}
                onDeleteSneaker={handleDeleteSneakerRequest}
                onViewDetails={handleViewDetails}
                viewMode={viewMode}
              />
            </div>
            
            <div className="w-full lg:w-1/3 space-y-8">
              <MarketAnalytics />
              <div className="bg-[#262626] border border-[#404040] rounded-lg shadow-lg p-5">
                <h3 className="text-lg font-semibold text-[#f5f5f5] mb-4">Community Highlights</h3>
                <CommunityFeed />
                <div className="mt-4 text-center">
                  <CustomButton variant="ghost" size="sm" className="text-[#d4d4d4] hover:text-white hover:bg-[#262626]">
                    View Community
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {editingSneaker && (
        <EditPairModal
          open={!!editingSneaker}
          onOpenChange={(open) => !open && setEditingSneaker(null)}
          sneaker={editingSneaker}
          onUpdatePair={handleUpdatePair}
        />
      )}

      {deletingSneaker && (
        <DeletePairModal
          open={!!deletingSneaker}
          onOpenChange={(open) => !open && setDeletingSneaker(null)}
          sneaker={deletingSneaker}
          onDeletePair={handleConfirmDeletePair}
        />
      )}

      {/* 5. Conditionally render the new details modal */}
            {viewingSneaker && (
                <SneakerDetailsModal
                    sneaker={viewingSneaker}
                    open={!!viewingSneaker}
                    onOpenChange={() => setViewingSneaker(null)} // Close modal by setting state to null
                />
            )}
    </div>
  );
};

export default Dashboard;