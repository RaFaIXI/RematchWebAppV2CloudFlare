"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = searchParams.get("userId");
    
    if (userId) {
      // Store user ID in localStorage
      localStorage.setItem("userId", userId);
      //latest login time
      const loginTime = new Date().toISOString();
      localStorage.setItem("loginTime", loginTime);
      // is logged in
      localStorage.setItem("isLoggedIn", "true");
      
      // Redirect to home page or dashboard
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setError("Authentication failed. No user ID received.");
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        {error ? (
          <div className="text-center">
            <h1 className="text-xl font-bold text-red-500 mb-4">Authentication Error</h1>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
            <button 
              onClick={() => router.push("/")}
              className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded"
            >
              Return Home
            </button>
          </div>
        ) : (
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
            <h1 className="text-xl font-bold mb-2">Logging you in...</h1>
            <p className="text-gray-600 dark:text-gray-300">Please wait while we complete your authentication.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}