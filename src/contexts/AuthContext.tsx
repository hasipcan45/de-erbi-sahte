import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "../types";

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This will be replaced by Firebase onAuthStateChanged
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const login = (email: string) => {
    // Mock login
    setUser({
      uid: "mock-uid",
      email,
      role: "USER",
      isSubscribed: false, // Start without subscription
      createdAt: Date.now(),
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
