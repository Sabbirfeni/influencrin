// auth-context.tsx
import { authApiService } from "@/api/endpoints";
import { RegistrationSchemaSchemaType } from "@/components/forms/schemas/auth/registration-schema";
import { LoginSchemaType } from "@/components/forms/schemas/auth/log-in-schema";
import ToastDescription from "@/components/toast/toast-description";
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
  const { request, loading: userLoading } = useApi(authApiService.getProfile);

  const fetchUser = async () => {
    const data = await request();
    if (data) setUser(data.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const {
    request: registrationRequest,
    errorMessage: registrationErrorMessage,
  } = useApi(authApiService.register);

  const registerUser = async (
    registrationData: RegistrationSchemaSchemaType
  ) => {
    const registeredUser = await registrationRequest(registrationData);
    if (registeredUser) {
      toast.success("Welcome to InfluencrIn", {
        description: <ToastDescription description={registeredUser.message} />,
      });
      navigate("/login");
    } else if (registrationErrorMessage) {
      toast.error("Failed to join", {
        description: registrationErrorMessage,
      });
    }
  };

  const { request: loginRequest, errorMessage: loginErrorMessage } = useApi(
    authApiService.login
  );
  const login = async (loginData: LoginSchemaType) => {
    const loggedUserData = await loginRequest(loginData);
    if (loggedUserData) {
      toast.success("Welcome", {
        description: <ToastDescription description={loggedUserData.message} />,
      });
      setUser(loggedUserData.user);
    } else if (loginErrorMessage) {
      console.log(loginErrorMessage);
      toast.error("Login Failed", {
        description: loginErrorMessage,
      });
    }
  };

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
      value={{
        user,
        setUser,
        userLoading,
        login,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
