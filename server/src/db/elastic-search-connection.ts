import { Client } from "@elastic/elasticsearch";

export const ESClient = new Client({
  node: "https://my-elasticsearch-project-ebc39b.es.ap-southeast-1.aws.elastic.cloud:443",
  auth: {
    apiKey: "d2ItdmRaWUJmVUZGRTFaS0ZPMnc6cEpSV2NIOEp6ZXBhTFhrNi1NX2J5QQ==",
  },
});

// Check Elasticsearch connection with a ping
export const connectToES = async () => {
  try {
    // A simple ping request to check the connection
    const pingResponse = await ESClient.ping();
    console.log("✅ Elasticsearch connection successful:", pingResponse);
    // await createOrUpdateMapping();
  } catch (error) {
    console.error("Error connecting to Elasticsearch:", error);
  }
};

const index = "influencers";

async function createOrUpdateMapping() {
  try {
    const exists = await ESClient.indices.exists({ index });

    if (exists) {
      await ESClient.indices.delete({ index });
      console.log("🗑️ Deleted existing index.");
    }

    await ESClient.indices.create({
      index,
      mappings: { properties },
    });
    console.log("✅ Created index with fresh mapping.");
  } catch (error) {
    console.error("❌ Error setting up mapping:", error);
  }
}

const properties = {
  id: { type: "keyword" as const },
  user_id: { type: "keyword" as const },
  fullname: { type: "text" as const },
  handle: { type: "keyword" as const },
  profile_image: { type: "keyword" as const },
  bio: { type: "text" as const },
  location: { type: "text" as const },

  social_profiles: {
    type: "nested" as const,
    properties: {
      platform_id: { type: "keyword" as const },
      platform_profile_link: { type: "keyword" as const },
      follower_count: { type: "integer" as const },
    },
  },

  categories: { type: "keyword" as const },

  reviews: {
    type: "nested" as const,
    properties: {
      review_id: { type: "keyword" as const },
      user_id: { type: "keyword" as const },
      rating: { type: "integer" as const },
      comment: { type: "text" as const },
    },
  },
};
