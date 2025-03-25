import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ErrorMessage = () => (
  <div className="flex flex-col items-center justify-center p-4 text-center">
    <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
    <p className="text-sm text-muted-foreground">Unable to load groups</p>
    <Button
      variant="ghost"
      className="mt-2"
      onClick={() => window.location.reload()}
    >
      Try Again
    </Button>
  </div>
);
