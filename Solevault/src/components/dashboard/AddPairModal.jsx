import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload, X } from "lucide-react";

const AddPairModal = ({ onAddPair }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    purchaseDate: "", // This field will be used for 'releaseDate' in the object sent to dashboard
    price: "",        // This field will be used for 'retailPrice'
    marketValue: "",
    image: "", 
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [formError, setFormError] = useState(""); // State for displaying form errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(""); // Clear previous errors

    // --- Client-Side Validation ---
    if (!formData.name.trim() || 
        !formData.brand.trim() || 
        !formData.model.trim() || 
        !formData.purchaseDate || 
        !formData.price.trim() || 
        !formData.marketValue.trim()) {
      setFormError("Please fill in all required fields marked with *.");
      return; 
    }

    const retailPriceNum = parseFloat(formData.price);
    const marketValueNum = parseFloat(formData.marketValue);

    if (isNaN(retailPriceNum) || retailPriceNum < 0) {
      setFormError("Purchase Price must be a valid non-negative number.");
      return;
    }
    if (isNaN(marketValueNum) || marketValueNum < 0) {
      setFormError("Market Value must be a valid non-negative number.");
      return;
    }
    // --- End Client-Side Validation ---

    let changePercentage = 0;
    if (retailPriceNum > 0) {
        changePercentage = ((marketValueNum - retailPriceNum) / retailPriceNum) * 100;
    }

    // This is the object that will be passed to Dashboard's handleAddPair
    const sneakerDataForDashboard = {
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      // The Dashboard's handleAddPair will map these to 'releaseDate' and 'retailPrice' for the API
      purchaseDate: formData.purchaseDate, 
      price: retailPriceNum, // Pass the parsed number
      marketValue: marketValueNum, // Pass the parsed number
      // The 'changePercentage' and 'id' are usually handled by the Dashboard or backend,
      // but if AddPairModal is meant to construct the full object, include them:
      // id: Date.now().toString(), // Example client-side ID if needed before backend save
      // changePercentage: changePercentage.toFixed(1), // Example formatting
      image: imagePreview || formData.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
    };
    
    console.log("Data validated and being sent from AddPairModal to Dashboard:", sneakerDataForDashboard);
    onAddPair(sneakerDataForDashboard); // This calls handleAddPair in Dashboard.jsx
    
    setOpen(false); // Close the modal on successful submission logic start
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "", brand: "", model: "", purchaseDate: "", price: "", marketValue: "", image: "",
    });
    setImageFile(null);
    setImagePreview("");
    setFormError(""); // Clear errors when form is reset
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); 
        setFormData(prev => ({ ...prev, image: "" })); 
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleOpenChange = (newOpenState) => {
    setOpen(newOpenState);
    if (!newOpenState) {
      resetForm(); // Reset form when modal is closed
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="flex items-center bg-[#171717] border border-[#404040] text-[#f5f5f5] hover:bg-[#262626]">
          <Plus size={16} className="mr-1" /> Add Pair
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#262626] border border-[#404040] text-[#f5f5f5] max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-[#f5f5f5] text-xl font-semibold">Add New Sneaker</DialogTitle>
        </DialogHeader>
        {formError && ( // Display form error message
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 text-red-400 rounded-md text-sm">
            {formError}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Image Upload Section (styles from previous version) */}
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
                    if (e.target.value && !imageFile) setImagePreview(e.target.value); 
                    else if (!e.target.value && !imageFile) setImagePreview("");
                }}
                placeholder="https://example.com/image.jpg"
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-[#d4d4d4] font-medium">Sneaker Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Air Jordan 1 High OG"
                required 
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>
            
            <div className="space-y-1.5">
              <Label htmlFor="brand" className="text-[#d4d4d4] font-medium">Brand <span className="text-red-500">*</span></Label>
              <Select onValueChange={(value) => handleInputChange("brand", value)} value={formData.brand} required>
                <SelectTrigger className="bg-[#171717] border-[#525252] text-[#f5f5f5] focus:border-[#737373] rounded-md data-[placeholder]:text-[#737373]">
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
            <Label htmlFor="model" className="text-[#d4d4d4] font-medium">Model/Colorway <span className="text-red-500">*</span></Label>
            <Input
              id="model"
              value={formData.model}
              onChange={(e) => handleInputChange("model", e.target.value)}
              placeholder="Chicago, Bred, Panda, etc."
              required
              className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
            />
          </div>

          {/* Purchase Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="purchaseDate" className="text-[#d4d4d4] font-medium">Purchase Date <span className="text-red-500">*</span></Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => handleInputChange("purchaseDate", e.target.value)}
                required
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] focus:border-[#737373] rounded-md"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="price" className="text-[#d4d4d4] font-medium">Purchase Price ($) <span className="text-red-500">*</span></Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0" // HTML5 validation for non-negative
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="180.00"
                required
                className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="marketValue" className="text-[#d4d4d4] font-medium">Market Value ($) <span className="text-red-500">*</span></Label>
              <Input
                id="marketValue"
                type="number"
                step="0.01"
                min="0" // HTML5 validation for non-negative
                value={formData.marketValue}
                onChange={(e) => handleInputChange("marketValue", e.target.value)}
                placeholder="450.00"
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
              onClick={() => handleOpenChange(false)} // Use handleOpenChange to ensure reset
              className="border-[#737373] bg-transparent hover:bg-[#171717] text-[#d4d4d4] hover:text-[#f5f5f5] rounded-md"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-2 px-6 rounded-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Add Sneaker
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPairModal;