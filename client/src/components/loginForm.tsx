import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login } from "@/lib/mutations/login";
import { currentUserAtom } from "@/lib/atoms";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  
 const queryClient = useQueryClient()

  const [_, setCurrentUser] = useAtom(currentUserAtom)
  const navigate = useNavigate();

  const loginFunc = useMutation({
    mutationFn: () =>
      Login({
        email: formData.email,
        password: formData.password,
      }),
    onSuccess: (data) => {
      if (!data.token) {
        alert('Invalid response: No token provided.');
        
        return;
      }
      localStorage.setItem("Authorization", `Bearer ${data.token}`);
      setCurrentUser(data.userId)
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate('/tasks');
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
        toast.error(`Error: ${errorMessage}`)
    },
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    loginFunc.mutate();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleFormChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleFormChange}
            required
          />
        </div>
        <Button type="submit" className="w-full" >
          Log in
        </Button>
        <div className="h-px my-2 bg-muted border-0"></div>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="sign-up" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}