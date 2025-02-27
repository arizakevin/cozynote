"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginPagePresentation } from "./presentation";
import type React from "react";
import { useSupabase } from "@/providers/supabase-provider";

export default function LoginPage() {
  const { supabase } = useSupabase();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/notes");
      }
    };
    checkUser();
  }, [router, supabase.auth]);

  const toggleView = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/notes");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      router.push("/notes");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      throw error;
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isLogin) {
        await handleLogin();
      } else {
        await handleSignUp();
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginPagePresentation
      isLogin={isLogin}
      email={email}
      password={password}
      error={error}
      isLoading={isLoading}
      onEmailChange={(e) => setEmail(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onSubmit={handleAuth}
      onToggleView={toggleView}
    />
  );
}
