import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/sequelize";
import bcrypt from "bcrypt";
import { UserAttributes, UserCreationAttributes } from "../types/user";

// Define the User model
const User = sequelize.define<Model<UserAttributes, UserCreationAttributes>>(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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

// Hook to hash password before creating a user
User.addHook(
  "beforeCreate",
  async (user: Model<UserAttributes, UserCreationAttributes>) => {
    // Safely access the email and password properties by explicitly casting the values to strings
    const email = user.get("email") as string; // Casting as string
    const passwordHash = user.get("password_hash") as string; // Casting as string

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("This email is already taken.");
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordHash, salt);

    // Set the hashed password
    user.set("password_hash", hashedPassword); // Set the resolved hashed password
  }
);

export default User;
