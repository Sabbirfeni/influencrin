import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";

interface SearchAttributes {
  id: string;
  createdAt?: string;
}

interface SearchCreationAttributes {
  id?: string;
  createdAt?: string;
}

const InfluencerSearch = sequelize.define<
  Model<SearchAttributes, SearchCreationAttributes>
>(
  "InfluencerSearchCount",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerSearch;
