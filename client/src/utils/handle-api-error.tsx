type ApiError = {
  response?: {
    data: {
      message?: string;
    };
  };
  message?: string;
  error?: string;
};

const handlApiError = (
  error: ApiError,
  fallbackMessage: string = "Something went wrong"
): string => {
  console.log(error);
  const message =
    error?.response?.data?.message ||
    error?.message ||
    error?.error ||
    fallbackMessage;

  return message;
};

export default handlApiError;
