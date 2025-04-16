import InfluencerCard from "./card/influencer-card";

function InfluencerList() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "X", followers: "60k" },
          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
      <InfluencerCard
        name="Jane Doe"
        handle="janedoe"
        rating={4.2}
        platforms={[
          { name: "Instagram", followers: "120k" },

          { name: "X", followers: "60k" },
        ]}
        categories={["Beauty", "Lifestyle", "Beauty", "Lifestyle"].slice(0, 3)}
      />
    </div>
  );
}

export default InfluencerList;
