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
import { Compass, Loader2 } from "lucide-react";

// Inner component that uses useSearchParams — must be inside <Suspense>
function RegisterForm() {
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

  const performRegister = async (regName: string, regEmail: string, regPass: string) => {
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
      }>("/auth/register", { name: regName, email: regEmail, password: regPass });

      const result = response.data;

      if (result.success && result.data) {
        toast.success(result.message || "Account created successfully!", { id: loadingToastId, duration: 2000 });
        login(result.data.accessToken, result.data.user);

        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        toast.error("Registration failed.", { id: loadingToastId, duration: 3000 });
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
      toast.error(errorMsg, { id: loadingToastId, duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const performLogin = async (loginEmail: string, loginPass: string) => {
    setIsLoading(true);
    const loadingToastId = toast.loading("Signing you in...");

    try {
      const response = await apiClient.post<{
        success: boolean;
        message: string;
        data: {
          accessToken: string;
          user: import("@/providers/AuthProvider").SafeUser;
        };
      }>("/auth/login", { email: loginEmail, password: loginPass });

      const result = response.data;

      if (result.success && result.data) {
        toast.success(result.message || "Logged in successfully!", { id: loadingToastId, duration: 2000 });
        login(result.data.accessToken, result.data.user);

        const redirectTo = searchParams.get("redirect") || "/";
        router.push(redirectTo);
      } else {
        toast.error("Invalid credentials.", { id: loadingToastId, duration: 3000 });
      }
    } catch (err: unknown) {
      console.error("[Login] Error:", err);
      let errorMsg = "Invalid email or password.";
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as { response?: { data?: { error?: string } } };
        if (axiosError.response?.data?.error) {
          errorMsg = axiosError.response.data.error;
        }
      }
      toast.error(errorMsg, { id: loadingToastId, duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await performRegister(name, email, password);
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


      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-[#0c1220] py-8 px-4 shadow-xl rounded-xl border border-border-color dark:border-slate-800/50 sm:px-10">
          
          <div className="mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-xs font-bold text-secondary-text mb-3 text-center uppercase tracking-wider">Quick Fill</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { 
                  setName("Demo User"); 
                  setEmail("user123@gmail.com"); 
                  setPassword("User123@gmail.com"); 
                  performLogin("user123@gmail.com", "User123@gmail.com"); 
                }}
                className="py-2 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 rounded-lg text-sm font-semibold transition-colors"
              >
                Demo User
              </button>
              <button
                type="button"
                onClick={() => { 
                  setName("Demo Admin"); 
                  setEmail("admin123@gmail.com"); 
                  setPassword("Admin123@gmail.com"); 
                  performLogin("admin123@gmail.com", "Admin123@gmail.com"); 
                }}
                className="py-2 px-3 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/20 rounded-lg text-sm font-semibold transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>

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

          <div className="mt-4 text-center text-sm text-secondary-text">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-primary hover:text-primary-dark transition-colors">
              Login
            </Link>
          </div>

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

// Suspense wrapper — prevents useSearchParams() from suspending the full route
export default function RegisterPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 dark:bg-[#090d16]">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      }
    >
      <RegisterForm />
    </React.Suspense>
  );
}
