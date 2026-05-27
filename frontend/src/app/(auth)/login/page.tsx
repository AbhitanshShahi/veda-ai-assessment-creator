"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const { login, isLoading, user, isCheckingAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!isCheckingAuth && user) {
      router.replace("/dashboard/assignment");
    }
  }, [user, isCheckingAuth, router]);

  if (isCheckingAuth) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(formData);

      toast.success("Login successful!");

      router.push("/dashboard/assignment");
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-background p-6">
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="w-full max-w-120"
      >
        <Card className="relative overflow-hidden rounded-4xl border border-border bg-card p-8 shadow-sm">
          <div className="absolute -right-10 -top-20 h-45 w-45 rounded-full bg-[#ff7a45]/10 blur-3xl" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                duration: 0.4,
              }}
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-black shadow-[0_0_20px_rgba(255,122,69,0.18)]"
            >
              <span className="text-xl font-bold text-white">V</span>
            </motion.div>

            <motion.h1
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.4,
              }}
              className="text-center text-[20px] font-bold leading-[140%] tracking-[-0.04em] text-foreground"
            >
              Welcome Back
            </motion.h1>

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.28,
                duration: 0.4,
              }}
              className="mt-2 text-center text-sm text-muted-foreground"
            >
              Sign in to continue to VedaAI
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.35,
              duration: 0.5,
            }}
            className="mt-8 space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Email Address
              </label>

              <Input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:scale-[1.01] focus-visible:ring-1 focus-visible:ring-black/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Password
              </label>

              <Input
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:scale-[1.01] focus-visible:ring-1 focus-visible:ring-black/20"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="h-12 w-full rounded-full border border-[#ff7a45] bg-black text-white shadow-[0_0_20px_rgba(255,122,69,0.22)] transition-all duration-300 hover:scale-[1.01] hover:bg-black/90"
            >
              {isLoading ? "Signing In..." : "Login"}
            </Button>
          </motion.form>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.45,
              duration: 0.4,
            }}
            className="mt-7 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-foreground transition-opacity hover:opacity-70"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
