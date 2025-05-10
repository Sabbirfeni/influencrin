import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import {
  VisitorAttributes,
  VisitorCreationAttributes,
} from "../types/site-visitor";
import User from "./user-model";

const SiteVisitor = sequelize.define<
  Model<VisitorAttributes, VisitorCreationAttributes>
>(
  "SiteVisitor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    visitor_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "SET NULL",
    },

    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },

    browser: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    operating_system: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    device_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    referrer: {
      type: DataTypes.TEXT, // max URL length
      allowNull: true,
    },

    country: {
      type: DataTypes.STRING(255), // Optional: e.g., "New York, US"
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Setup association with User
SiteVisitor.belongsTo(User, { foreignKey: "user_id", as: "user" });

export default SiteVisitor;
