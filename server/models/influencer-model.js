import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import User from "./user-model.js";

const Influencer = sequelize.define(
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
      unique: true,
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
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    social_media_links: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

Influencer.addHook("beforeCreate", async (influencer) => {
  // Check if the handle already exists in the database
  const existingHandle = await Influencer.findOne({
    where: { handle: influencer.handle },
  });
  if (existingHandle) {
    throw new Error("This handle is already taken.");
  }
});

export default Influencer;
