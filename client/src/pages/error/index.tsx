import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SectionWrappers from "@/components/wrappers/section-wrapper";
import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError() as Error;
  console.log(error);
  return (
    <div className="min-h-[75vh] flex items-center justify-center">
      <SectionWrappers>
        <Alert className="w-[380px] md:w-[500px] h-24 shadow-2xl border-none">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="text-red-300">
            Something went wrong!
          </AlertTitle>
          <AlertDescription>
            <p>{error.message}</p>
          </AlertDescription>
        </Alert>
      </SectionWrappers>
    </div>
  );
}
