import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import Influencer from "./influencer-model";
import {
  InfluencerCategoryAttributes,
  InfluencerCategoryCreationAttributes,
} from "../types/influencer-category";

const InfluencerCategory = sequelize.define<
  Model<InfluencerCategoryAttributes, InfluencerCategoryCreationAttributes>
>(
  "InfluencerCategory",
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
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default InfluencerCategory;
