import { jwtDecode } from "jwt-decode";

import { authApiService } from "@/api/endpoints";
import { RegistrationSchemaSchemaType } from "@/components/forms/schemas/auth/registration-schema";
import { LoginSchemaType } from "@/components/forms/schemas/auth/log-in-schema";
import ToastDescription from "@/components/toast/toast-description";
import { AuthContext } from "@/contexts";
import { useApi } from "@/hooks";
import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface User {
  id: string;
  fullname: string;
  email: string;
  profile_image?: string | null;
  exp?: number;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let decodedUser: User | null = null;
  if (token) {
    decodedUser = jwtDecode<User>(token);
  }

  const [user, setUser] = useState<User | null>(decodedUser);

  // User registration api call
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

  // User login api call
  const { request: loginRequest, errorMessage: loginErrorMessage } = useApi(
    authApiService.login
  );
  const login = async (loginData: LoginSchemaType) => {
    const loginResponse = await loginRequest(loginData);

    if (loginResponse) {
      localStorage.setItem("token", loginResponse.token);
      const loggedUserData = jwtDecode<User>(loginResponse.token);
      setUser(loggedUserData);
      toast.success("Welcome", {
        description: <ToastDescription description={loginResponse.message} />,
      });
    } else if (loginErrorMessage) {
      toast.error("Login failed", {
        description: loginErrorMessage,
      });
    }
  };

  // User logout api call
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.error("You're logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
