import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";

// Interface EditPairModalProps removed
// React.FC<EditPairModalProps> replaced with simple functional component definition

const EditPairModal = ({ 
  open, 
  onOpenChange, 
  sneaker, 
  onUpdatePair 
}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    purchaseDate: "", // This corresponds to 'releaseDate' in the sneaker object during population
    price: "",        // This corresponds to 'retailPrice'
    marketValue: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null); // Type <File | null> removed
  const [imagePreview, setImagePreview] = useState(""); // Type <string> removed

  useEffect(() => {
    if (sneaker) {
      setFormData({
        name: sneaker.name || "",
        brand: sneaker.brand || "",
        model: sneaker.model || "",
        purchaseDate: sneaker.releaseDate || "", // Assuming sneaker object has 'releaseDate' for this field
        price: sneaker.retailPrice?.toString() || "",
        marketValue: sneaker.marketValue?.toString() || "",
        image: sneaker.image || "",
      });
      setImagePreview(sneaker.image || "");
      setImageFile(null); // Reset image file when sneaker changes
    } else {
      // Reset form if sneaker is null (e.g., modal closed and editingSneaker set to null)
      setFormData({
        name: "", brand: "", model: "", purchaseDate: "", price: "", marketValue: "", image: ""
      });
      setImagePreview("");
      setImageFile(null);
    }
  }, [sneaker]); // Dependency array includes sneaker

  // Type React.FormEvent removed from 'e'
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const retailPrice = parseFloat(formData.price);
    const currentMarketValue = parseFloat(formData.marketValue);
    let changePercentage = 0;

    if (retailPrice > 0) {
        changePercentage = ((currentMarketValue - retailPrice) / retailPrice) * 100;
    }

    const updatedSneaker = {
      ...sneaker, // Preserve existing sneaker ID and any other fields
      name: formData.name,
      brand: formData.brand,
      model: formData.model,
      releaseDate: formData.purchaseDate, // Map form's purchaseDate back to releaseDate
      retailPrice: retailPrice,
      marketValue: currentMarketValue,
      changePercentage: changePercentage, // Recalculate change percentage
      image: imagePreview || formData.image || sneaker.image, // Prioritize new preview, then new URL, then original
    };

    onUpdatePair(updatedSneaker);
    onOpenChange(false); // Close the modal
  };

  // Type annotations removed from field and value
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Type React.ChangeEvent<HTMLInputElement> removed from 'e'
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Type assertion "as string" removed
        setFormData(prev => ({ ...prev, image: "" })); // Clear URL if file is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
    // Keep formData.image as is, or clear it if user expects "remove" to also clear URL
    // setFormData(prev => ({ ...prev, image: "" })); 
  };
  
  // Prevents rendering the form if sneaker data isn't loaded yet, avoiding errors
  if (!sneaker) {
    return null; 
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#262626] border border-[#404040] text-[#f5f5f5] max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[#f5f5f5] text-xl font-semibold">Edit Sneaker</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section - Styled consistently with AddPairModal */}
          <div className="space-y-3">
            <Label className="text-[#d4d4d4] font-medium">Sneaker Image</Label>
            <div className="flex flex-col space-y-3">
              {imagePreview ? (
                <div className="relative w-full h-48 bg-[#171717] rounded-lg border border-[#525252] overflow-hidden group">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-[#262626]/80 hover:bg-[#404040] text-[#f5f5f5] rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Remove image"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="w-full h-48 bg-[#1a1a1a] border-2 border-dashed border-[#525252] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#737373] transition-colors">
                  <Upload size={28} className="text-[#737373] mb-2" />
                  <span className="text-[#d4d4d4] text-sm font-medium">Click to upload image</span>
                  <span className="text-[#737373] text-xs mt-1">PNG, JPG, GIF up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              <div className="text-[#737373] text-xs flex items-center">
                <span className="flex-grow border-t border-[#404040] mr-2"></span>
                <span>Or paste an image URL below</span>
                <span className="flex-grow border-t border-[#404040] ml-2"></span>
              </div>
              <Input
                value={formData.image}
                onChange={(e) => {
                    handleInputChange("image", e.target.value);
                    // Update preview if URL is pasted and no file is selected
                    if (e.target.value && !imageFile) setImagePreview(e.target.value); 
                    else if (!e.target.value && !imageFile) setImagePreview(sneaker?.image || ""); // Revert to original or clear if no original
                }}
                placeholder="https://example.com/image.jpg"
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name" className="text-[#d4d4d4] font-medium">Sneaker Name <span className="text-red-500">*</span></Label>
              <Input
                id="edit-name" // Unique ID for label association
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="edit-brand" className="text-[#d4d4d4] font-medium">Brand <span className="text-red-500">*</span></Label>
              <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)} required>
                <SelectTrigger id="edit-brand" className="bg-[#171717] border-[#525252] text-[#f5f5f5] focus:border-[#737373] rounded-md data-[placeholder]:text-[#737373]">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent className="bg-[#262626] border-[#404040] text-[#f5f5f5]">
                   {["Nike", "Adidas", "Yeezy", "New Balance", "Jordan", "Converse", "Vans", "Other"].map(brand => (
                    <SelectItem key={brand} value={brand} className="hover:bg-[#404040!important] focus:bg-[#525252!important] cursor-pointer">
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-model" className="text-[#d4d4d4] font-medium">Model/Colorway <span className="text-red-500">*</span></Label>
            <Input
              id="edit-model"
              value={formData.model}
              onChange={(e) => handleInputChange("model", e.target.value)}
              required
              className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
            />
          </div>

          {/* Purchase Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-purchaseDate" className="text-[#d4d4d4] font-medium">Purchase Date <span className="text-red-500">*</span></Label>
              <Input
                id="edit-purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                required
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] focus:border-[#737373] rounded-md"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-price" className="text-[#d4d4d4] font-medium">Purchase Price ($) <span className="text-red-500">*</span></Label>
              <Input
                id="edit-price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-marketValue" className="text-[#d4d4d4] font-medium">Market Value ($) <span className="text-red-500">*</span></Label>
              <Input
                id="edit-marketValue"
                type="number"
                step="0.01"
                value={formData.marketValue}
                onChange={(e) => handleInputChange("marketValue", e.target.value)}
                required
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-[#404040]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-[#737373] bg-transparent hover:bg-[#171717] text-[#d4d4d4] hover:text-[#f5f5f5] rounded-md"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Update Sneaker
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPairModal;