import { ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-gray-900">
               <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 text-white">D</div>
               <span>Değer Biç</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Gayrimenkul değerleme ve analiz süreçleriniz için profesyonel, 
              hızlı ve güvenilir çözümler sunuyoruz.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Kurumsal</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-blue-600">Hakkımızda</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600">İletişim</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600">Gizlilik Politikası</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Hesap</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li><Link to="/login" className="hover:text-blue-600">Giriş Yap</Link></li>
              <li><Link to="/register" className="hover:text-blue-600">Hesap Oluştur</Link></li>
              <li className="pt-2">
                <Link to="/login?admin=true" className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-blue-600">
                  <ShieldCheck className="h-3 w-3" />
                  Değerlemeci Girişi
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Değer Biç. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
