"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Button } from '@/components/ui';
import { loginSchema, type LoginFormData } from '@/schemas';
import { Lock } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading = false,
  error,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-lg border border-border p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground dark:text-foreground">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-muted-foreground dark:text-muted-foreground">
          Sign in to access your dashboard
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            label="Email address"
            type="email"
            {...register('email')}
            error={!!errors.email}
            errorMessage={errors.email?.message}
          />

          <Input
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            errorMessage={errors.password?.message}
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3">
            <p className="text-sm text-destructive text-center">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            className="w-full h-11 text-base font-medium"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Demo Credentials
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-mono">admin@rebuhr.com</span></p>
              <p><span className="font-mono">password123</span></p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
