"use client";

import type { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export function AuthProvider({
  user,
  children,
}: {
  user: User | null;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
