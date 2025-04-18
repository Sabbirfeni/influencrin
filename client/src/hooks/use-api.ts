import { handlApiError } from "@/utils";
import { useState } from "react";

// Type for the API function
type ApiFunc<T> = (...args: any[]) => Promise<T>;

// Type for the hook response
type UseApiReturn<T> = {
  request: (...args: any[]) => Promise<T | undefined>;
  loading: boolean;
  error: string | null;
};

const useApi = <T>(apiFunc: ApiFunc<T>): UseApiReturn<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (...args: any[]): Promise<T | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      return result;
    } catch (err) {
      const error = handlApiError(err);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApi;
