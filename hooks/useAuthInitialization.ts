"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

/**
 * Custom hook to initialize authentication state only once.
 * Should be used at the root of the application (in layout or providers).
 */
export function useAuthInitialization() {
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (initialized.current) return;

    // Mark as initialized
    initialized.current = true;

    // Initialize auth state
    const initAuth = useAuthStore.getState().initAuth;
    initAuth();

    // Optional: Log initialization for debugging
    if (process.env.NODE_ENV === "development") {
      console.log("[Auth] Initialized authentication state");
    }
  }, []); // Empty dependency array ensures this runs once
}