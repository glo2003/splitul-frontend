"use client";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "../contexts/user-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { setUserName } = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string) => {
    if (!value) {
      setError("Name cannot be empty");
      return false;
    }
    if (value.includes(" ")) {
      setError("Name cannot contain spaces");
      return false;
    }
    setError("");
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };

  const handleContinue = () => {
    if (validateInput(inputValue)) {
      setUserName(inputValue);
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">SplitUL</h1>
          <p className="text-lg text-muted-foreground">
            Split expenses with your friends, hassle-free
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter your name"
              className="text-center"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter" && handleContinue()}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleContinue}
            disabled={!!error || !inputValue}
          >
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
