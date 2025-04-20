// auth-context.tsx
import { authApiService } from "@/api/endpoints";
import { AuthContext } from "@/contexts";
import { useApi } from "@/hooks";
import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface User {
  id: string;
  fullname: string;
  email: string;
  profile_image?: string;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const { request, loading, errorMessage } = useApi(authApiService.getProfile);

  const fetchUser = async () => {
    const data = await request();
    if (data) setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const { request: logoutRequest, errorMessage: logoutErrorMessage } = useApi(
    authApiService.logout
  );

  const logout = async () => {
    const data = await logoutRequest();
    if (data) {
      setUser(null);
      toast.error(data.message);
      navigate("/");
    } else if (logoutErrorMessage) {
      toast.error("Unable to log out", {
        description: logoutErrorMessage,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, errorMessage, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
