import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Loader2 } from "lucide-react";

const EditPairModal = ({ open, onOpenChange, sneaker, onUpdatePair, isSubmitting }) => {
    const [formData, setFormData] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [isAiLoading, setIsAiLoading] = useState(false);
    const debounceTimeout = useRef(null);

    // Effect to populate the form when the modal opens with a sneaker
    useEffect(() => {
        if (sneaker) {
            const purchaseDate = sneaker.releaseDate ? new Date(sneaker.releaseDate).toISOString().split('T')[0] : "";
            setFormData({
                name: sneaker.name || "",
                brand: sneaker.brand || "",
                model: sneaker.model || "",
                purchaseDate: purchaseDate,
                price: sneaker.retailPrice?.toString() || "",
                marketValue: sneaker.marketValue?.toString() || "",
                image: sneaker.image || "",
                description: sneaker.description || "",
            });
            setImagePreview(sneaker.image || "");
        }
    }, [sneaker]);

    // Effect for AI Autocomplete when the name changes
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        if (formData.name && formData.name !== sneaker?.name) {
            debounceTimeout.current = setTimeout(async () => {
                setIsAiLoading(true);
                try {
                    const token = localStorage.getItem('soleVaultToken');
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/sneakers/autocomplete-sneaker`, { sneakerName: formData.name }, { headers: { Authorization: `Bearer ${token}` } });
                    const { brand, description } = response.data;
                    setFormData(prev => ({ ...prev, brand: brand || prev.brand, description: description || prev.description }));
                } catch (error) { console.error('AI Autocomplete failed:', error); }
                finally { setIsAiLoading(false); }
            }, 800);
        }
        return () => { if (debounceTimeout.current) clearTimeout(debounceTimeout.current); };
    }, [formData.name, sneaker?.name]);

    // --- NEW: Effect for handling pasted image URLs ---
    useEffect(() => {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
        if (formData.image && formData.image.startsWith('http') && !formData.image.includes('cloudinary.com')) {
            debounceTimeout.current = setTimeout(async () => {
                setIsUploading(true);
                setImagePreview(formData.image);
                try {
                    const token = localStorage.getItem('soleVaultToken');
                    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/sneakers/upload-from-url`, { imageUrl: formData.image }, { headers: { Authorization: `Bearer ${token}` } });
                    setFormData(prev => ({ ...prev, image: response.data.secure_url }));
                    setImagePreview(response.data.secure_url);
                } catch (error) { console.error("URL upload failed:", error); }
                finally { setIsUploading(false); }
            }, 1000);
        }
        return () => { if (debounceTimeout.current) clearTimeout(debounceTimeout.current); };
    }, [formData.image]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setFormData(prev => ({ ...prev, image: "" }));
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        setIsUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
        try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, uploadFormData);
            setFormData(prev => ({ ...prev, image: response.data.secure_url }));
        } catch (err) {
            console.error("Image upload failed:", err);
            setImagePreview(sneaker?.image || "");
        } finally {
            setIsUploading(false);
        }
    };

    const removeImage = () => {
        setImagePreview("");
        setFormData(prev => ({ ...prev, image: "" }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedSneaker = {
            ...sneaker,
            ...formData,
            retailPrice: parseFloat(formData.price),
            marketValue: parseFloat(formData.marketValue),
            releaseDate: formData.purchaseDate,
            image: formData.image || "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80",
        };
        onUpdatePair(updatedSneaker);
        onOpenChange(false);
    };

    if (!sneaker) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-[#262626] border border-[#404040] text-[#f5f5f5] max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-[#f5f5f5] text-xl font-semibold">Edit Sneaker</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* --- Complete Image Editing Section --- */}
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
                                <span className="text-[#d4d4d4] text-sm font-medium">Click to upload new image</span>
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={isUploading} />
                            </label>
                        )}
                        <div className="text-[#737373] text-xs flex items-center"><span className="flex-grow border-t border-[#404040] mr-2"></span><span>OR</span><span className="flex-grow border-t border-[#404040] ml-2"></span></div>
                        <Input
                            placeholder="Paste a new image URL here"
                            className="bg-[#171717] border-[#525252] text-[#f5f5f5] placeholder:text-[#737373] focus:border-[#737373] rounded-md"
                            value={formData.image || ''}
                            onChange={(e) => handleInputChange("image", e.target.value)}
                        />
                    </div>
                    
                    {/* --- Rest of the form --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="space-y-1.5">
                            <Label htmlFor="edit-name">Sneaker Name <span className="text-red-500">*</span></Label>
                            <div className="relative flex items-center">
                                <Input id="edit-name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" />
                                {isAiLoading && <Loader2 className="absolute right-3 h-4 w-4 animate-spin text-gray-400" />}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="edit-brand">Brand <span className="text-red-500">*</span></Label>
                            <Input id="edit-brand" value={formData.brand} onChange={(e) => handleInputChange("brand", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="edit-model">Model/Colorway <span className="text-red-500">*</span></Label>
                        <Input id="edit-model" value={formData.model} onChange={(e) => handleInputChange("model", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea id="edit-description" value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} placeholder="AI-generated description will appear here..." className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1.5"><Label htmlFor="edit-purchaseDate">Purchase Date <span className="text-red-500">*</span></Label><Input id="edit-purchaseDate" type="date" value={formData.purchaseDate} onChange={(e) => handleInputChange("purchaseDate", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" /></div>
                        <div className="space-y-1.5"><Label htmlFor="edit-price">Purchase Price ($) <span className="text-red-500">*</span></Label><Input id="edit-price" type="number" step="0.01" value={formData.price} onChange={(e) => handleInputChange("price", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" /></div>
                        <div className="space-y-1.5"><Label htmlFor="edit-marketValue">Market Value ($) <span className="text-red-500">*</span></Label><Input id="edit-marketValue" type="number" step="0.01" value={formData.marketValue} onChange={(e) => handleInputChange("marketValue", e.target.value)} required className="bg-[#171717] border-[#525252] text-[#f5f5f5] rounded-md" /></div>
                    </div>

                    <DialogFooter className="pt-6 border-t border-[#404040]">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={isUploading || isSubmitting}>
                            {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Uploading...</> : (isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Saving...</> : 'Save Changes')}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditPairModal;