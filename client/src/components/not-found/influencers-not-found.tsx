import React from "react";

function InfluencersNotFound({ message }) {
  return (
    <div className="w-full h-[30vh] flex items-center justify-center text-center py-4 text-gray-500">
      {message}
    </div>
  );
}

export default InfluencersNotFound;
