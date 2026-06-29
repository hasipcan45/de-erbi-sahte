import { useState, FormEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get("admin") === "true";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email);
    // If admin is true, we should mock admin role
    // For now, simple redirect
    if (isAdminLogin) {
       navigate("/admin");
    } else {
       const redirect = searchParams.get("redirect");
       navigate(redirect === "valuation" ? "/" : "/");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            {isAdminLogin ? <ShieldCheck className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {isAdminLogin ? "Değerlemeci Girişi" : "Hesabınıza Giriş Yapın"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isAdminLogin 
              ? "Yönetici paneline erişmek için bilgilerinizi girin." 
              : "Raporlarınızı yönetmek ve yeni talep oluşturmak için giriş yapın."}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                className="block w-full border-b border-gray-300 bg-transparent py-3 pl-10 pr-4 text-gray-900 focus:border-blue-600 focus:outline-none sm:text-sm transition-colors"
                placeholder="E-posta Adresiniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                className="block w-full border-b border-gray-300 bg-transparent py-3 pl-10 pr-4 text-gray-900 focus:border-blue-600 focus:outline-none sm:text-sm transition-colors"
                placeholder="Şifreniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Beni Hatırla
              </label>
            </div>
            <Link to="/forgot-password" size="sm" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Şifremi Unuttum
            </Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Giriş Yap
          </button>
        </form>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          {!isAdminLogin && (
            <p className="text-center text-sm text-gray-600">
              Hesabınız yok mu?{" "}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500">
                Şimdi Kaydolun
              </Link>
            </p>
          )}

          {!isAdminLogin && (
            <div className="text-center">
               <Link 
                 to="/login?admin=true" 
                 className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <ShieldCheck className="h-3 w-3" />
                  Değerlemeci Girişi
               </Link>
            </div>
          )}

          {isAdminLogin && (
            <p className="text-center text-sm text-gray-600">
              Kullanıcı girişi mi yapmak istiyorsunuz?{" "}
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                Geri Dön
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
