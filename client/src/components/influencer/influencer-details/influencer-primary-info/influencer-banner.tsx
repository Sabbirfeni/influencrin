import ImpluencerPlaceholderBanner from "../../../../assets/images/influencer-placeholder-banner.jpg";

function InfluencerBanner() {
  return (
    <div className="w-full h-[20vh] md:h-[30vh]">
      <img
        src={ImpluencerPlaceholderBanner}
        className="w-full h-full object-cover"
        alt="impluencer banner"
      />
    </div>
  );
}

export default InfluencerBanner;
