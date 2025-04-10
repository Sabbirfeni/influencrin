import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.js";
import bcrypt from "bcrypt";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUID,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.addHook("beforeCreate", async (user) => {
  // Check if the email already exists in the database
  const existingUser = await User.findOne({ where: { email: user.email } });
  if (existingUser) {
    throw new Error("This email is already taken. Please choose another one.");
  }

  // Hash the password before saving it
  const salt = await bcrypt.genSalt(10);
  user.password_hash = await bcrypt.hash(user.password_hash, salt);
});

export default User;
