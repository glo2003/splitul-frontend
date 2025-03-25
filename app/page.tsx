"use client";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser } from "../contexts/user-context";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const { setUserName } = useUser();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleContinue = () => {
    if (inputValue.trim()) {
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
          <Input
            type="text"
            placeholder="Enter your name"
            className="text-center"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button size="lg" className="w-full gap-2" onClick={handleContinue}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
