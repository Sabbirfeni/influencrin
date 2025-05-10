import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../db/sequelize";

interface SearchCountAttributes {
  id: string;
  count: number;
}

interface SearchCountCreationAttributes {
  id?: string;
  count?: number;
}

const InfluencerSearchCount = sequelize.define<
  Model<SearchCountAttributes, SearchCountCreationAttributes>
>(
  "SearchCount",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default InfluencerSearchCount;
