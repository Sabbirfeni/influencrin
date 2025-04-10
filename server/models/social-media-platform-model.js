// models/SocialMediaPlatform.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";

const SocialMediaPlatform = sequelize.define("SocialMediaPlatform", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  platform_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
});

export default SocialMediaPlatform;
