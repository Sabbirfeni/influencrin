// models/InfluencerSocialPlatform.ts
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "./influencer-model";

import SocialMediaPlatform from "./social-media-platform-model";
import {
  InfluencerSocialPlatformAttributes,
  InfluencerSocialPlatformCreationAttributes,
} from "../types/influencer-social-platform";

const InfluencerSocialPlatform = sequelize.define<
  Model<
    InfluencerSocialPlatformAttributes,
    InfluencerSocialPlatformCreationAttributes
  >
>(
  "InfluencerSocialPlatform",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    influencer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Influencer,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    platform_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SocialMediaPlatform,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    platform_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    follower_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    profile_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerSocialPlatform;
