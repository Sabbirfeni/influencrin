export interface InfluencerSocialPlatformAttributes {
  id?: string; // optional because Sequelize auto-generates it
  influencer_id: string; // foreign key linking to the Influencer
  platform_id: string;
  platform_name: string;
  follower_count?: number;
  profile_link?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InfluencerSocialPlatformCreationAttributes
  extends Omit<
    InfluencerSocialPlatformAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}
