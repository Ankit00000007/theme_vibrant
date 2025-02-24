import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/store/auth-store";
import { login } from "@/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  afterLogin?: () => void;
}

export function LoginDialog({
  open,
  onOpenChange,
  afterLogin,
}: LoginDialogProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLogin = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      const response = await login(values);
      setAuth(response.token, response.user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      onOpenChange(false);
      afterLogin?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    window.location.href = "https://d.vibrant-science.com/register";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] h-[90vh] sm:h-auto bg-gradient-to-br from-[#7fffd4] to-[#98fb98]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-emerald-700">
            Welcome to Vibrant Health Science
          </DialogTitle>
          <DialogDescription className="text-base text-gray-700">
            Sign in to your account to continue
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-180px)] sm:max-h-none">
          <div className="px-6 py-4">
            <Form {...loginForm}>
              <form
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-6"
              >
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username"
                          className="h-11 bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base text-gray-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-11 bg-white/70 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-emerald-100"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-11 text-base bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                  onClick={handleRegisterClick}
                >
                  Register here
                </Button>
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
