import React from "react";
import SneakerCard from "./SneakerCard"; // Assuming SneakerCard.jsx is in the same directory

// defaultCollectionData is removed as sneakers are passed via props from Dashboard

const CollectionGrid = ({ 
  className, 
  sneakers = [], // Default to empty array if sneakers prop is not provided
  onEditSneaker,
  onDeleteSneaker,
  onViewDetails, 
  viewMode 
}) => {
  
  // console.log("DEBUG: CollectionGrid received sneakers:", sneakers); // Log all sneakers received by the grid

  return (
    <div className={className}>
      {sneakers && sneakers.length > 0 ? (
        <div className={`grid gap-6 p-4 md:p-1 ${viewMode === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'}`}>
          {sneakers.map((sneaker, index) => {
            // Determine the ID to use. Prefer 'id' (Mongoose virtual) if it exists, otherwise '_id'.
            const idToUse = sneaker.id || sneaker._id; 
            
            // ***** ADD THIS DETAILED LOGGING *****
            console.log(
              `DEBUG: CollectionGrid mapping sneaker [${index}]: Name: "${sneaker.name}", ` +
              `Has sneaker.id: ${sneaker.hasOwnProperty('id')} (value: "${sneaker.id}"), ` +
              `Has sneaker._id: ${sneaker.hasOwnProperty('_id')} (value: "${sneaker._id}"), ` +
              `Resulting idToUse for key/prop: "${idToUse}"`
            );
            
            if (!idToUse) {
              console.error(
                `ERROR IN CollectionGrid: Sneaker at index ${index} (Name: "${sneaker.name}") has an UNDEFINED or NULL id/_id. Sneaker object:`, 
                JSON.parse(JSON.stringify(sneaker)) // Log the problematic sneaker object
              );
              // You might want to skip rendering this card or render a placeholder
              // return <div key={`error-${index}`}>Error: Sneaker data missing ID.</div>;
            }

            // If idToUse is still somehow undefined/null, use index as a last resort for the key
            // to silence the React key warning, but the underlying ID issue must be fixed.
            const keyForReact = idToUse ? idToUse.toString() : `sneaker-fallback-${index}`;

            return (
              <SneakerCard
    key={sneaker._id || sneaker.id}
    {...sneaker} // <-- This one line passes: name, brand, model, description, image, etc.
    id={sneaker._id || sneaker.id} // We pass `id` again just to ensure it's the correct one
    onEdit={onEditSneaker}
    onDelete={onDeleteSneaker}
    onViewDetails={onViewDetails}
/>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 col-span-full"> {/* Ensure this message spans full width if in a grid parent */}
          <p className="text-xl text-gray-500">No sneakers in your collection yet.</p>
        </div>
      )}
    </div>
  );
};

export default CollectionGrid;