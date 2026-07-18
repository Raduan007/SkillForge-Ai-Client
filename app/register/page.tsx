"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { apiClient } from "@/services/apiClient";
import { toast } from "react-hot-toast";
import { Input, PasswordInput } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { GoogleLoginButton } from "@/components/shared/GoogleLoginButton";
import { Compass } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user } = useAuth();
  
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{ name?: string; email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = React.useState(false);

  // If user is already logged in, redirect to dashboard or home
  React.useEffect(() => {
    if (user) {
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    }
  }, [user, router, searchParams]);

  const validate = () => {
    const newErrors: { name?: string; email?: string; password?: string } = {};
    if (!name) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else {
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      }
      if (!/[A-Z]/.test(password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      }
      if (!/[a-z]/.test(password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      }
      if (!/[0-9]/.test(password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const loadingToastId = toast.loading("Creating your account...");

    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: {
          accessToken: string;
          user: import("@/providers/AuthProvider").SafeUser;
        };
      }>("/auth/register", { name, email, password });

      const result = response.data;

      if (result.success && result.data) {
        toast.success(result.message || "Account created successfully!", { id: loadingToastId });
        login(result.data.accessToken, result.data.user);
        
        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        toast.error("Registration failed.", { id: loadingToastId });
      }
    } catch (err: unknown) {
      console.error("[Register] Error:", err);
      let errorMsg = "Registration failed. Try again.";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          errorMsg = axiosError.response.data.error;
        }
      }
      toast.error(errorMsg, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#090d16] select-none">
      <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md shadow-primary/10 mb-4">
          <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white dark:bg-[#090d16]">
            <Compass className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Create free account
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-text">
          Or{" "}
          <Link href="/login" className="font-bold text-primary hover:text-primary-dark transition-colors">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#0c1220] py-8 px-4 shadow-xl rounded-xl border border-border-color dark:border-slate-800/50 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              disabled={isLoading}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              disabled={isLoading}
              required
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              disabled={isLoading}
              required
              helperText="Must contain at least 8 chars, 1 uppercase, 1 lowercase, and 1 number."
            />

            <div>
              <Button
                type="submit"
                variant="primary"
                size="large"
                isLoading={isLoading}
                className="w-full text-xs font-bold"
              >
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-color dark:border-slate-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase select-none">
                <span className="bg-white dark:bg-[#0c1220] px-2 text-secondary-text">
                  Or register with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleLoginButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
