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
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    platform_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SocialMediaPlatform,
        key: "id",
      },
      onUpdate: "CASCADE",
    },
    platform_profile_link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "unique_platform_profile_link",
        msg: "This influencer profile link is already taken.",
      },
    },
    follower_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerSocialPlatform;
