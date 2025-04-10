export interface ReviewAttributes {
  id?: string; // Optional because Sequelize auto-generates it
  user_id: string;
  influencer_id: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReviewCreationAttributes
  extends Omit<ReviewAttributes, "id" | "createdAt" | "updatedAt"> {}
