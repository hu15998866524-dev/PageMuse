"use client";

import { createContext, ReactNode, useContext, useRef, useState } from "react";
import { Check } from "lucide-react";

type ToastContextType = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const timerRef = useRef<number | null>(null);

  function showToast(nextMessage: string) {
    setMessage(nextMessage);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setMessage("");
    }, 2200);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        {message ? (
          <div className="flex items-center gap-2 rounded-full border border-line bg-charcoal px-4 py-2 text-sm text-sand shadow-card">
            <Check className="h-4 w-4" />
            <span>{message}</span>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
