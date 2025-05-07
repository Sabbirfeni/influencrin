import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import {
  InfluencerAddRequestAttributes,
  InfluencerAddRequestCreationAttributes,
} from "../types/influencer-add-request";

const InfluencerAddRequest = sequelize.define<
  Model<InfluencerAddRequestAttributes, InfluencerAddRequestCreationAttributes>
>(
  "InfluencerAddRequest",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    platform_profile_link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerAddRequest;
