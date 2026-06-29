import { Home, User, LogIn, ClipboardList, ShieldCheck, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { name: "Ana Sayfa", path: "/", icon: Home },
    { name: "Raporlarım", path: "/accounts/reports", icon: ClipboardList },
    { name: "Abonelik", path: "/accounts/subscriptions", icon: User },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
            <span className="text-xl font-bold">D</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">Değer Biç</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-blue-600",
                location.pathname === item.path ? "text-blue-600" : "text-gray-600"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">{user.email}</span>
              <button 
                onClick={logout}
                className="flex items-center gap-1.5 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                Çıkış
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-md"
            >
              <LogIn className="h-4 w-4" />
              Giriş Yap
            </Link>
          )}

          {user?.role === "ADMIN" && (
            <Link 
              to="/admin" 
              className="flex items-center gap-1.5 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700"
            >
              <ShieldCheck className="h-4 w-4" />
              Admin
            </Link>
          )}
        </nav>

        {/* Mobile Nav Trigger (Simplified) */}
        <div className="flex items-center gap-2 md:hidden">
           {user ? (
             <button onClick={logout} className="p-2 text-gray-600"><LogOut className="h-6 w-6" /></button>
           ) : (
             <Link to="/login" className="p-2 text-gray-600 hover:text-blue-600">
               <LogIn className="h-6 w-6" />
             </Link>
           )}
        </div>
      </div>
    </header>
  );
}
