import { RegistrationSchemaSchemaType } from "@/components/forms/schemas/auth/registration-schema";
import { LoginSchemaType } from "@/components/forms/schemas/auth/log-in-schema";
import { createContext } from "react";

// 1. Define User and AuthContextType interfaces
export interface User {
  id: string;
  fullname: string;
  email: string;
  profile_image?: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userLoading: boolean;
  login: (userData: LoginSchemaType) => void;
  registerUser: (registrationData: RegistrationSchemaSchemaType) => void;
  logout: () => void;
}

// 2. Create context with correct type and default null
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
