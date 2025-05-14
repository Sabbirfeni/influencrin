import React from "react";
import InfluencerAddRequestBtn from "../influencer/add-request/influencer-add-request-btn";

function InfluencersNotFound({ message }) {
  return (
    <div className="w-full h-[50vh] flex flex-col gap-3 items-center justify-center text-sm text-center py-4 text-gray-500">
      {message}
      <p className="text-gray-300">We're looking for influencers to add.</p>
      <InfluencerAddRequestBtn />
    </div>
  );
}

export default InfluencersNotFound;
