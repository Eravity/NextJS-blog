'use client';

import { useEffect, useState } from 'react';
import { authHelpers } from '@/app/_lib/auth';

export default function TokenSetter() {
  const [tokenSet, setTokenSet] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check authentication status
    const checkAuth = () => {
      try {
        const authenticated = authHelpers.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        // Automatically set the token for testing if not authenticated
        if (!authenticated) {
          const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhiYzUxNzQ5MWE1YTgxYjc2YmRhNWMiLCJpYXQiOjE3NTQxNjMwNjB9.3dB5gJX6PFHb1RIxqLvgjY2pPdaWaI0dDr4XHnSG5VQ';
          authHelpers.setToken(testToken);
          setTokenSet(true);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleSetToken = () => {
    const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODhiYzUxNzQ5MWE1YTgxYjc2YmRhNWMiLCJpYXQiOjE3NTQxNjMwNjB9.3dB5gJX6PFHb1RIxqLvgjY2pPdaWaI0dDr4XHnSG5VQ';
    authHelpers.setToken(testToken);
    setTokenSet(true);
    setIsAuthenticated(true);
    window.location.reload();
  };

  const handleClearToken = () => {
    authHelpers.removeToken();
    setTokenSet(false);
    setIsAuthenticated(false);
    window.location.reload();
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 bg-neutral-800 p-4 rounded-lg border border-neutral-600">
        <h3 className="text-white font-semibold mb-2">Auth Status</h3>
        <p className="text-sm text-neutral-300 mb-3">
          Status: Loading...
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm cursor-not-allowed"
          >
            Loading...
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-neutral-800 p-4 rounded-lg border border-neutral-600">
      <h3 className="text-white font-semibold mb-2">Auth Status</h3>
      <p className="text-sm text-neutral-300 mb-3">
        Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not authenticated'}
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleSetToken}
          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Set Test Token
        </button>
        <button
          onClick={handleClearToken}
          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
        >
          Clear Token
        </button>
      </div>
      {tokenSet && (
        <p className="text-xs text-green-400 mt-2">Token set! Refresh to see posts.</p>
      )}
    </div>
  );
}
