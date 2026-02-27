// src/pages/auth/Login.tsx — Login page

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<"organization" | "trader">("organization");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "organization") {
      navigate("/org/dashboard");
    } else {
      navigate("/trader/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-7">
          <Link to="/" className="inline-flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">TenderFlow</span>
          </Link>
          <h1 className="text-xl font-semibold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl shadow-card p-6 border border-border">
          {/* Role Toggle */}
          <div className="flex rounded-lg bg-muted p-1 mb-5">
            {(["organization", "trader"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-1.5 rounded-md text-sm font-medium transition-all ${
                  role === r
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {r === "organization" ? "Organization" : "Trader"}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                defaultValue={
                  role === "organization"
                    ? "admin@apex.com"
                    : "sarah@novatech.com"
                }
                className="h-9"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  defaultValue="password"
                  className="h-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPass ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full gap-2 h-9">
              Sign in
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </form>

          {/* Quick demo links */}
          <div className="mt-4 pt-4 border-t border-border space-y-1.5">
            <p className="text-xs text-muted-foreground text-center mb-2">
              Quick demo access
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs h-8"
              onClick={() => navigate("/org/dashboard")}
            >
              Enter as Organization Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs h-8"
              onClick={() => navigate("/trader/dashboard")}
            >
              Enter as Trader Demo
            </Button>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
