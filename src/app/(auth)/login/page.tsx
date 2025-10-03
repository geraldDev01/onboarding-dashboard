"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/forms/LoginForm';
import { loginAction } from '@/app/actions/auth';
import { type LoginFormData } from '@/schemas';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await loginAction(data.email, data.password);
      if (result.success) {
        router.push('/dashboard');
        router.refresh(); 
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <LoginForm 
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
}
