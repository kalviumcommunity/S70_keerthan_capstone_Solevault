import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const DeletePairModal = ({ 
  open, 
  onOpenChange, 
  sneaker, 
  onDeletePair // This is handleConfirmDeletePair from Dashboard.jsx
}) => {

  const handleDelete = () => {
    // alert(`ALERT from DeletePairModal handleDelete! Sneaker: ${sneaker?.name}, ID: ${sneaker?._id || sneaker?.id}`); // We know this worked, so remove/comment out

    const idToDelete = sneaker?._id || sneaker?.id; 
    
    console.log(`DEBUG DPM: 1. Inside handleDelete. idToDelete: ${idToDelete}`);
    
    if (idToDelete) {
      console.log(`DEBUG DPM: 2. idToDelete is valid. Checking typeof onDeletePair: ${typeof onDeletePair}`);
      if (typeof onDeletePair === 'function') {
        console.log(`DEBUG DPM: 3. onDeletePair is a function. About to call onDeletePair("${idToDelete}").`);
        
        // debugger; // <<< --- PAUSE HERE ---
        
        onDeletePair(idToDelete); // This calls handleConfirmDeletePair in Dashboard.jsx
        
        console.log(`DEBUG DPM: 4. onDeletePair("${idToDelete}") has been called.`); 
        // Note: The modal usually closes because Dashboard.jsx sets deletingSneaker to null.
        // If Dashboard.jsx's handleConfirmDeletePair is async, this log might appear before it fully completes.
      } else {
        console.error("DEBUG DPM ERROR: onDeletePair is not a function!", onDeletePair);
      }
    } else {
      console.error("DEBUG DPM ERROR: Sneaker ID is missing in handleDelete!", sneaker);
    }
    // It's generally better for the Dashboard to control closing the modal by setting deletingSneaker to null
    // after the delete operation is fully complete (success or error).
    // Calling onOpenChange(false) here might be premature if onDeletePair is async and errors out.
    // onOpenChange(false); 
  };

  if (!sneaker) {
    return null;
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-[#262626] border border-[#404040] text-[#f5f5f5] rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#f5f5f5] text-lg font-semibold">
            Delete Sneaker Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#a3a3a3] pt-2">
            Are you sure you want to delete "{sneaker?.name || 'this sneaker'}"? 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel 
            type="button"
            className="border-[#737373] bg-transparent hover:bg-[#171717] text-[#d4d4d4] hover:text-[#f5f5f5] rounded-md focus:ring-offset-black"
            onClick={() => onOpenChange(false)} 
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            type="button" 
            onClick={handleDelete} 
            className="bg-red-600 hover:bg-red-700 text-white rounded-md focus:ring-red-500 focus:ring-offset-black"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePairModal;