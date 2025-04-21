import { handlApiError } from "@/utils";
import { useState } from "react";

// Type for the API function
type ApiFunc<T> = (...args: unknown[]) => Promise<T>;

// Type for the hook response
type UseUserApiReturn<T> = {
  request: (...args: unknown[]) => Promise<T | undefined>;
  loading: boolean;
  errorMessage: string | null;
};

const useUserApi = <T>(apiFunc: ApiFunc<T>): UseUserApiReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const request = async (...args: unknown[]): Promise<T | undefined> => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await apiFunc(...args);
      return result;
    } catch (err: unknown) {
      const errMessage = handlApiError(err);
      setErrorMessage(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, errorMessage };
};

export default useUserApi;
