type ApiError = {
  response?: {
    data: {
      message?: string;
    };
  };
  message?: string;
};

const handlApiError = (
  error: ApiError,
  fallbackMessage: string = "Something went wrong"
): string => {
  const message =
    error?.response?.data?.message || error?.message || fallbackMessage;

  return message;
};

export default handlApiError;
