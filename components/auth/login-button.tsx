"use client";

import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/components/auth/login-form";


interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  type?: "register" | "login";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("sign-in");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
        <DialogTitle className="sr-only hidden">Login</DialogTitle>
         <LoginForm />
         
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
