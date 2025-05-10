export interface VisitorAttributes {
  id: string;
  user_id?: string | null;
  visitor_id: string;
  ip_address?: string | null;
  browser?: string | null;
  operating_system?: string | null;
  device_type?: string | null;
  referrer?: string | null;
  country?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface VisitorCreationAttributes
  extends Omit<VisitorAttributes, "id" | "createdAt" | "updatedAt"> {}
