import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import type React from "react";
import { useCallback } from "react";

interface LoginPagePresentationProps {
  isLogin: boolean;
  email: string;
  password: string;
  error: string | null;
  isLoading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleView: () => void;
}

export function LoginPagePresentation({
  isLogin,
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onToggleView,
}: Readonly<LoginPagePresentationProps>) {
  const getButtonText = (isLoading: boolean, isLogin: boolean) => {
    if (isLoading) {
      return "Loading...";
    }
    return isLogin ? "Login" : "Sign Up";
  };

  const renderCactusImage = useCallback(() => {
    return (
      <Image
        src="/cozy-cactus-illustration.png"
        alt="Cozy cactus illustration"
        width={95}
        height={113}
      />
    );
  }, []);

  const renderCatImage = useCallback(() => {
    return (
      <Image
        src="/cozy-sleepy-cat-illustration.png"
        alt="Cozy cat illustration"
        width={188.14}
        height={134}
      />
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center items-center min-h-[190px]">
            {isLogin ? renderCatImage() : renderCactusImage()}
          </div>
          <h1 className="text-4xl font-display text-brown font-bold">
            {isLogin ? "Yay, You're Back!" : "Yay, New Friend!"}
          </h1>
        </div>
        <form className="mt-12 space-y-10" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="border-brown h-12 px-4 font-sans placeholder-black"
                placeholder="Email address"
                value={email}
                onChange={onEmailChange}
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="border-brown h-12 px-4 font-sans placeholder-black"
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
                disabled={isLoading}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div>
            <Button
              type="submit"
              variant="outline"
              className="w-full text-brown h-12 text-lg font-sans border brown rounded-full border-brown hover:text-brown"
              size="lg"
              disabled={isLoading}
            >
              {getButtonText(isLoading, isLogin)}
            </Button>
            <div className="text-center mt-4">
              <Button
                variant="link"
                onClick={onToggleView}
                className="text-brown-dark hover:underline font-sans"
                disabled={isLoading}
              >
                {isLogin
                  ? "Oops! I've never been here before"
                  : "We're already friends!"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
