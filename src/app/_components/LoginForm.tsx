'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authHelpers } from '@/app/_lib/auth';
import { toast } from 'react-hot-toast';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await authHelpers.login(email, password);
      
      if (response.success) {
        toast.success('Login successful!');
        router.push('/About/Posts');
        router.refresh();
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-neutral-800 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Login to Grindly</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-neutral-200 mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-neutral-700 text-white rounded border border-neutral-600 focus:border-amber-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-neutral-200 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-neutral-700 text-white rounded border border-neutral-600 focus:border-amber-500 focus:outline-none"
            placeholder="Enter your password"
          />
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-amber-500 text-white rounded hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="mt-4 text-center text-neutral-400">
        Don&apos;t have an account?{' '}
        <a href="/register" className="text-amber-500 hover:text-amber-400">
          Sign up
        </a>
      </p>
    </div>
  );
}
