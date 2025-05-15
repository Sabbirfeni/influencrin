type InputFieldErrorProps = {
  errMessage?: string;
};

export const InputFieldError = ({ errMessage }: InputFieldErrorProps) => {
  if (!errMessage) return null;
  return <p className="text-xs text-red-500">{errMessage}</p>;
};

export default InputFieldError;
