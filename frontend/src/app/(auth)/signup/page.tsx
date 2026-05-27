"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/store/auth.store";

export default function SignupPage() {
  const router = useRouter();

  const { signup, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    schoolName: "",
    selectedClass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(formData);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="w-full max-w-[520px]"
      >
        <Card className="relative overflow-hidden rounded-4xl border border-border bg-card shadow-sm p-8">
          <div className="absolute top-[-80px] right-[-40px] w-[180px] h-[180px] rounded-full bg-[#ff7a45]/10 blur-3xl" />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.4,
              }}
              className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(255,122,69,0.18)]"
            >
              <span className="text-white text-xl font-bold">V</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.4,
              }}
              className="text-[20px] font-bold leading-[140%] tracking-[-0.04em] text-center text-foreground"
            >
              Create Your Account
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.28,
                duration: 0.4,
              }}
              className="text-sm text-muted-foreground mt-2 text-center"
            >
              Start generating AI-powered assignments with VedaAI
            </motion.p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.35,
              duration: 0.5,
            }}
            className="mt-8 space-y-5"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Full Name
              </label>

              <Input
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:scale-[1.01]"
              />
            </div>

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
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                School Name
              </label>

              <Input
                name="schoolName"
                type="text"
                placeholder="Enter your school name"
                value={formData.schoolName}
                onChange={handleChange}
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Class
              </label>

              <Input
                name="selectedClass"
                type="text"
                placeholder="Enter class"
                value={formData.selectedClass}
                onChange={handleChange}
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:scale-[1.01]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Password
              </label>

              <Input
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="h-12 rounded-2xl border-border bg-muted/40 shadow-none transition-all focus-visible:ring-1 focus-visible:ring-black/20 focus-visible:scale-[1.01]"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-black text-white border border-[#ff7a45] shadow-[0_0_20px_rgba(255,122,69,0.22)] hover:bg-black/90 hover:scale-[1.01] transition-all duration-300"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.45,
              duration: 0.4,
            }}
            className="mt-7 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-foreground font-semibold hover:opacity-70 transition-opacity"
              >
                Login
              </Link>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
