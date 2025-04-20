// auth-context.tsx
import { authApiService } from "@/api/endpoints";
import { AuthContext } from "@/contexts";
import { useApi } from "@/hooks";
import { useEffect, useState, ReactNode } from "react";

export interface User {
  id: string;
  fullname: string;
  email: string;
  profile_image?: string;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const { request, loading, errorMessage } = useApi(authApiService.getProfile);

  const fetchUser = async () => {
    const data = await request();
    if (data) setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, errorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
