import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ErrorSectionProps = {
  errorMessage: string;
};

export default function ErrorSection({ errorMessage }: ErrorSectionProps) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Alert className="w-[380px] md:w-[500px] h-24 shadow-2xl border-none">
        <Terminal className="h-4 w-4" />
        <AlertTitle className="text-red-300">Something went wrong!</AlertTitle>
        <AlertDescription>
          <p>{errorMessage}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
