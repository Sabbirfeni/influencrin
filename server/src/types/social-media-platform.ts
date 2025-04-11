export interface SocialMediaPlatformAttributes {
  id?: string; // Optional because Sequelize auto-generates it
  platform_name: string;
  platform_icon_url: string;
}

export interface SocialMediaPlatformCreationAttributes
  extends Omit<SocialMediaPlatformAttributes, "id"> {}
