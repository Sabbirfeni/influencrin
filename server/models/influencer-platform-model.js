// models/InfluencerPlatform.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import Influencer from "./influencer-model.js";

const InfluencerPlatform = sequelize.define(
  "InfluencerPlatform",
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
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerPlatform;
