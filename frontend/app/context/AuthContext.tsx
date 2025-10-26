"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  registerNumber: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Load token from localStorage on mount
    const stored = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");
    if (stored && storedUser) {
      try {
        setToken(stored);
        setUser(JSON.parse(storedUser));
      } catch {}
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Route protection
    if (isLoading) return;

    const publicPaths = ["/"];
    const adminPaths = ["/admin"];
    const protectedPaths = ["/dashboard", "/reported"];

    const isPublic = publicPaths.includes(pathname);
    const isAdmin = adminPaths.some((p) => pathname.startsWith(p));
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    if (!user && !isPublic) {
      // Not logged in and trying to access protected route
      router.push("/");
    } else if (user && isAdmin && !user.isAdmin) {
      // Non-admin trying to access admin route
      router.push("/dashboard");
    } else if (user && pathname === "/") {
      // Already logged in, redirect to appropriate dashboard
      if (user.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, pathname, isLoading, router]);

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(newUser));
    
    // Redirect based on role
    if (newUser.isAdmin) {
      router.push("/admin/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
