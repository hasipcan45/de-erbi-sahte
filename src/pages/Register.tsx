import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User } from "lucide-react";
import { motion } from "motion/react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="flex min-h-[calc(100vh-128px)] items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-xl"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Hesap Oluşturun
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Ücretsiz üye olun, gayrimenkul değerleme taleplerinizi kolayca yönetin.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                className="block w-full border-b border-gray-300 bg-transparent py-3 pl-10 pr-4 text-gray-900 focus:border-blue-600 focus:outline-none sm:text-sm transition-colors"
                placeholder="Adınız ve Soyadınız"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                className="block w-full border-b border-gray-300 bg-transparent py-3 pl-10 pr-4 text-gray-900 focus:border-blue-600 focus:outline-none sm:text-sm transition-colors"
                placeholder="E-posta Adresiniz"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                className="block w-full border-b border-gray-300 bg-transparent py-3 pl-10 pr-4 text-gray-900 focus:border-blue-600 focus:outline-none sm:text-sm transition-colors"
                placeholder="Şifreniz"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            Hesap Oluştur
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{" "}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
            Giriş Yapın
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
