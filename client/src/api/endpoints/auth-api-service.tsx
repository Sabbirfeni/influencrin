import axios from "../axios";

export interface AuthResponse {
  message: string;
  user: {
    id: string;
    email: string;
    fullname: string;
    profile_image: string;
  };
}

export interface UserProfile {
  message: string;
  user: {
    id: string;
    email: string;
    fullname: string;
    profile_image: string;
  };
}

const authApiService = {
  login: async (formData: FormData): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/login", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  signup: async (formData: FormData): Promise<AuthResponse> => {
    const res = await axios.post<AuthResponse>("/auth/signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  getProfile: async (): Promise<UserProfile> => {
    const res = await axios.get<UserProfile>("/auth/me");
    return res.data;
  },
};

export default authApiService;
