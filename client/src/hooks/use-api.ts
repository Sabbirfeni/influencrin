import { handlApiError } from "@/utils";
import { ParsedApiError } from "@/utils/handle-api-error";
import { useState } from "react";

// Type for the API function
type ApiFunc<T, A extends unknown[]> = (...args: A) => Promise<T>;

// Return type for the hook
type UseApiReturn<T, A extends unknown[]> = {
  request: (
    ...args: A
  ) => Promise<{ data?: T; error?: string | object | ParsedApiError }>;
  loading: boolean;
  errorMessage: string | object | null;
};

const useApi = <T, A extends unknown[]>(
  apiFunc: ApiFunc<T, A>
): UseApiReturn<T, A> => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | object | null>(
    null
  );

  const request = async (
    ...args: A
  ): Promise<{ data?: T; error?: string | object }> => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await apiFunc(...args);
      return { data: result };
    } catch (err) {
      const error = handlApiError(err as ParsedApiError) ?? {
        message: "Unknown error",
      };
      setErrorMessage(error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, errorMessage };
};

export default useApi;
