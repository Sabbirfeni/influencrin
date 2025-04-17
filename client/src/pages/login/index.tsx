import LoginForm from "@/components/forms/auth/login-form";

function LoginPage() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
