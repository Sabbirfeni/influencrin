export type ApiError = {
  response?: {
    data?: {
      message?: string;
      description?: string;
    };
  };
  message?: string;
  error?: string;
};

export type ParsedApiError = {
  message: string;
  description?: string;
};

const handlApiError = (
  requestError: ApiError,
  fallbackMessage: string = "Something went wrong"
): ParsedApiError | null => {
  const message =
    requestError?.response?.data?.message ||
    requestError?.message ||
    requestError?.error ||
    fallbackMessage;

  const description = requestError?.response?.data?.description;

  if (!message) {
    return null;
  }

  return { message, ...(description && { description }) };
};

export default handlApiError;
