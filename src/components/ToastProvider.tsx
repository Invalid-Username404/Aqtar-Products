"use client";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        success: {
          duration: 3000,
          style: {
            background: "#10B981",
            color: "#fff",
          },
        },
        error: {
          duration: 4000,
          style: {
            background: "#EF4444",
            color: "#fff",
          },
        },
      }}
    />
  );
}
