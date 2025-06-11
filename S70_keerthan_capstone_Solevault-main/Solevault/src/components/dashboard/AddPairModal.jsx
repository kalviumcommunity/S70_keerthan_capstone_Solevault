import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, X, Loader2 } from "lucide-react";

const initialFormState = {
    name: "",
    brand: "",
    model: "",
    purchaseDate: "",
    price: "",
    marketValue: "",
    image: "",
    description: "",
};

// The 'isSubmitting' prop will be passed down from the Dashboard to control the button state
const AddPairModal = ({ onAddPair, isSubmitting }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState(initialFormState);
    const [imagePreview, setImagePreview] = useState("");
    const [formError, setFormError] = useState("");
    
    const [isUploading, setIsUploading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const debounceTimeout = useRef(null);

    // AI Autocomplete Logic
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        if (formData.name && formData.name.length > 3) {
            debounceTimeout.current = setTimeout(async () => {
                setIsAiLoading(true);
                try {
                    const token = localStorage.getItem('soleVaultToken');
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/ai/autocomplete-sneaker`,
                        { sneakerName: formData.name },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    const { brand, description } = response.data;
                    setFormData(prev => ({
                        ...prev,
                        ...(brand && { brand }),
                        ...(description && { description }),
                    }));
                } catch (error) {
                    console.error('AI Autocomplete failed:', error);
                } finally {
                    setIsAiLoading(false);
                }
            }, 800);
        }
        return () => { if (debounceTimeout.current) clearTimeout(debounceTimeout.current); };
    }, [formData.name]);

    // --- NEW: useEffect for handling Image URL Pasting ---
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        
        // Check if the input looks like a URL
        if (formData.image && formData.image.startsWith('http') && !formData.image.includes('cloudinary.com')) {
            debounceTimeout.current = setTimeout(async () => {
                setIsUploading(true); // Use the same spinner as file upload
                setImagePreview(formData.image); // Show a preview of the pasted link immediately
                try {
                    const token = localStorage.getItem('soleVaultToken');
                    // Call our new backend endpoint
                    const response = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/sneakers/upload-from-url`,
                        { imageUrl: formData.image },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    
                    // IMPORTANT: Update the formData with the NEW Cloudinary URL
                    setFormData(prev => ({ ...prev, image: response.data.secure_url }));
                    // Also update the preview to the final Cloudinary image
                    setImagePreview(response.data.secure_url);

                } catch (error) {
                    console.error("URL upload failed:", error);
                    setFormError("Failed to upload image from URL.");
                } finally {
                    setIsUploading(false);
                }
            }, 1000); // Wait 1 second after user stops pasting/typing
        }
        return () => { if (debounceTimeout.current) clearTimeout(debounceTimeout.current); };
    }, [formData.image]); // This effect runs only when the image URL input changes

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFormData(prev => ({ ...prev, image: "" })); // Clear any pasted URL
        
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                uploadFormData
            );
            setFormData(prev => ({ ...prev, image: response.data.secure_url }));
        } catch (err) {
            setFormError("Image upload failed. Please try again.");
            setImagePreview("");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setImagePreview("");
        setFormData(prev => ({ ...prev, image: "" }));
    };
    
    const resetForm = () => {
        setFormData(initialFormState);
        setImagePreview("");
        setFormError("");
    };

    const handleOpenChange = (newOpenState) => {
        setOpen(newOpenState);
        if (!newOpenState) {
            resetForm();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");

        const requiredFields = ['name', 'brand', 'model', 'purchaseDate', 'price', 'marketValue'];
        for (const field of requiredFields) {
            if (!formData[field] || !String(formData[field]).trim()) {
                setFormError("Please fill in all required fields marked with *.");
                return;
            }
        }
        
        // --- CORRECTED LOGIC ---
        // We only use formData.image because it holds the final permanent URL
        // from either Cloudinary or the pasted link. imagePreview might be a temporary local URL.
        const finalImage = formData.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80";

        const sneakerDataForDashboard = {
            ...formData,
            name: formData.name.trim(),
            brand: formData.brand.trim(),
            model: formData.model.trim(),
            price: parseFloat(formData.price),
            marketValue: parseFloat(formData.marketValue),
            image: finalImage
        };

        onAddPair(sneakerDataForDashboard);
        handleOpenChange(false);
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
                    <DialogDescription className="text-[#a3a3a3]">
                        Enter sneaker details below. Start with the name for AI assistance.
                    </DialogDescription>
                </DialogHeader>
                {formError && (
                    <div className="p-3 bg-red-900/30 border border-red-700 text-red-400 rounded-md text-sm">{formError}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload Section */}
                    <div className="space-y-2">
                        <Label className="text-[#d4d4d4] font-medium">Sneaker Image</Label>
                        {imagePreview ? (
                            <div className="relative w-full h-48 bg-[#171717] rounded-lg border border-[#525252] overflow-hidden group">
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <button type="button" onClick={removeImage} className="absolute top-2 right-2 bg-[#262626]/80 hover:bg-[#404040] text-[#f5f5f5] rounded-full p-1.5 transition-all opacity-0 group-hover:opacity-100"><X size={18} /></button>
                                {isUploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-white" /></div>}
                            </div>
                        ) : (
                            <label className="w-full h-32 bg-[#1a1a1a] border-2 border-dashed border-[#525252] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#737373] transition-colors">
                                <Upload size={28} className="text-[#737373] mb-2" />
                                <span className="text-[#d4d4d4] text-sm font-medium">Click to upload image</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                            </label>
                        )}
                        <div className="text-[#737373] text-xs flex items-center"><span className="flex-grow border-t border-[#404040] mr-2"></span><span>OR</span><span className="flex-grow border-t border-[#404040] ml-2"></span></div>
                        <Input placeholder="Paste an image URL here" className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" value={formData.image} onChange={(e) => { handleInputChange("image", e.target.value); setImagePreview(e.target.value); }}/>
                    </div>
                    {/* Basic Information Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5"><Label htmlFor="name" className="text-[#d4d4d4] font-medium">Sneaker Name <span className="text-red-500">*</span></Label><div className="relative flex items-center"><Input id="name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} placeholder="e.g., Air Jordan 1 High" required className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" />{isAiLoading && <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-gray-400" />}</div></div>
                        <div className="space-y-1.5"><Label htmlFor="brand" className="text-[#d4d4d4] font-medium">Brand <span className="text-red-500">*</span></Label><Input id="brand" value={formData.brand} onChange={(e) => handleInputChange("brand", e.target.value)} placeholder="e.g., Nike" required className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" /></div>
                    </div>
                    {/* Other fields... */}
                    <div className="space-y-1.5"><Label htmlFor="model" className="text-[#d4d4d4] font-medium">Model/Colorway <span className="text-red-500">*</span></Label><Input id="model" value={formData.model} onChange={(e) => handleInputChange("model", e.target.value)} placeholder="Chicago, Bred, Panda" required className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" /></div>
                    <div className="space-y-1.5"><Label htmlFor="description" className="text-[#d4d4d4] font-medium">Description</Label><Textarea id="description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="AI-generated description will appear here..." className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" /></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5"><Label htmlFor="purchaseDate" className="text-[#d4d4d4] font-medium">Purchase Date <span className="text-red-500">*</span></Label><Input id="purchaseDate" type="date" value={formData.purchaseDate} onChange={(e) => handleInputChange("purchaseDate", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] focus:border-[#737373] rounded-md" /></div>
                        <div className="space-y-1.5"><Label htmlFor="price" className="text-[#d4d4d4] font-medium">Purchase Price ($) <span className="text-red-500">*</span></Label><Input id="price" type="number" step="0.01" min="0" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} placeholder="180.00" required className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" /></div>
                        <div className="space-y-1.5"><Label htmlFor="marketValue" className="text-[#d4d4d4] font-medium">Market Value ($) <span className="text-red-500">*</span></Label><Input id="marketValue" type="number" step="0.01" min="0" value={formData.marketValue} onChange={(e) => handleInputChange("marketValue", e.target.value)} placeholder="450.00" required className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md" /></div>
                    </div>
                    
                    <DialogFooter className="pt-6 border-t border-[#404040]">
                        <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="border-[#737373] bg-transparent hover:bg-[#171717] text-[#d4d4d4] hover:text-[#f5f5f5] rounded-md">Cancel</Button>
                        <Button 
  type="submit" 
  disabled={isUploading || isSubmitting} // <-- CORRECTED
  className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-md flex items-center justify-center"
>
  {isUploading ? (
    <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Uploading...</>
  ) : isSubmitting ? ( // <-- CORRECTED
    <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Adding...</>
  ) : (
    'Add Sneaker'
  )}
</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddPairModal;