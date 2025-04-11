import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import User from "./user-model";
import {
  InfluencerAttributes,
  InfluencerCreationAttributes,
} from "../types/influencer";

// Define the Influencer model
const Influencer = sequelize.define<
  Model<InfluencerAttributes, InfluencerCreationAttributes>
>(
  "Influencer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    handle: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        name: "unique_handle",
        msg: "This handle is already taken.",
      },
    },
    profile_image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Influencer;
