import React from "react";
import InfluencerAddRequestBtn from "../influencer/add-request/influencer-add-request-btn";

function InfluencersNotFound({ message }) {
  return (
    <div className="w-full h-[30vh] flex flex-col gap-3 items-center justify-center text-center py-4 text-gray-500">
      {message}
      <InfluencerAddRequestBtn />
    </div>
  );
}

export default InfluencersNotFound;
