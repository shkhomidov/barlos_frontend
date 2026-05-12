"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { OsmedeusLogo } from "@/components/osmedeus-logo";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderIcon, AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading: authLoading, isAuthenticated } = useAuth();
  const [username, setUsername] = React.useState("osmedeus");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [authLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await login(username, password);
      toast.success("Welcome back!", {
        description: "You have been signed in successfully.",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  if (authLoading || isAuthenticated) {
    return (
      <div className="flex items-center justify-center py-12 text-muted-foreground">
        <LoaderIcon className="mr-2 size-4 animate-spin" />
        <span>Redirecting...</span>
      </div>
    );
  }

  return (
    <>
    <Card className="w-full shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-6 flex size-28 items-center justify-center rounded-2xl">
          <OsmedeusLogo size={112} aria-label="Barlos" className="logo-shadow" />
        </div>
        <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
        <CardDescription>
          Sign in to your Barlos Dashboard
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircleIcon className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="osmedeus"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

        </CardContent>

        <CardFooter className="flex flex-col gap-4 mt-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderIcon className="mr-2 size-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
          <div className="flex items-center justify-center gap-3">
            <ThemeToggle variant="outline" size="sm" className="rounded-full px-3" ariaLabel="Toggle theme" label="Theme" />
          </div>
        </CardFooter>
      </form>
    </Card>
    </>
  );
}
