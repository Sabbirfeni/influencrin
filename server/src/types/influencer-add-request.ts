export interface InfluencerAddRequestAttributes {
  id?: string;
  platform_profile_link: string;
  email?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InfluencerAddRequestCreationAttributes
  extends Omit<
    InfluencerAddRequestAttributes,
    "id" | "email" | "createdAt" | "updatedAt"
  > {}
