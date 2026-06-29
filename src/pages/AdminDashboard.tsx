import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  Settings,
  Menu,
  X,
  LogOut,
  LayoutDashboard
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

const StatsCard = ({ title, value, icon: Icon, color }: any) => (
  <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
        <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`rounded-lg p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Genel Bakış", path: "/admin", icon: LayoutDashboard },
    { name: "Tüm Talepler", path: "/admin/requests", icon: FileText },
    { name: "Bekleyen Raporlar", path: "/admin/pending", icon: Clock },
    { name: "Tamamlananlar", path: "/admin/completed", icon: CheckCircle2 },
    { name: "Kullanıcı Yönetimi", path: "/admin/users", icon: Users },
    { name: "Ödemeler & Abonelik", path: "/admin/payments", icon: CreditCard },
  ];

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-white transition-transform lg:static lg:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex h-full flex-col p-4">
          <div className="flex items-center justify-between lg:hidden">
             <span className="font-bold">Admin Panel</span>
             <button onClick={() => setIsSidebarOpen(false)}><X className="h-6 w-6" /></button>
          </div>
          
          <nav className="mt-8 flex-1 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                  ${location.pathname === item.path 
                    ? "bg-blue-50 text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                `}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="border-t border-gray-200 pt-4">
             <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
               <LogOut className="h-5 w-5" />
               Güvenli Çıkış
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
         <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
            <button 
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
         </div>

         <Routes>
           <Route path="/" element={
             <div className="space-y-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                   <StatsCard title="Aktif Kullanıcı" value="1,248" icon={Users} color="bg-blue-500" />
                   <StatsCard title="Yeni Talepler" value="12" icon={FileText} color="bg-amber-500" />
                   <StatsCard title="Bekleyen" value="45" icon={Clock} color="bg-indigo-500" />
                   <StatsCard title="Tamamlanan" value="892" icon={CheckCircle2} color="bg-emerald-500" />
                </div>

                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                   <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
                      <h3 className="font-semibold text-gray-900">Son Rapor Talepleri</h3>
                   </div>
                   <div className="p-0 overflow-x-auto">
                      <table className="w-full text-left text-sm">
                         <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                            <tr>
                               <th className="px-6 py-4">Mülk Sahibi</th>
                               <th className="px-6 py-4">Gayrimenkul Türü</th>
                               <th className="px-6 py-4">Konum</th>
                               <th className="px-6 py-4">Tarih</th>
                               <th className="px-6 py-4">Durum</th>
                               <th className="px-6 py-4 text-right">İşlem</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-200">
                            {[1, 2, 3, 4, 5].map((i) => (
                               <tr key={i} className="hover:bg-gray-50/50">
                                  <td className="px-6 py-4 font-medium text-gray-900">Ahmet Yılmaz</td>
                                  <td className="px-6 py-4 capitalize">Konut (Daire)</td>
                                  <td className="px-6 py-4 text-gray-500">İstanbul, Kadıköy</td>
                                  <td className="px-6 py-4 text-gray-500">01.06.2026</td>
                                  <td className="px-6 py-4">
                                     <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                                        BEKLEMEDE
                                     </span>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                     <button className="font-semibold text-blue-600 hover:text-blue-700">İncele</button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                   <div className="border-t border-gray-200 bg-gray-50/50 px-6 py-4 text-center">
                      <button className="text-xs font-semibold text-gray-500 hover:text-gray-700">Tümünü Görüntüle (Limit 10)</button>
                   </div>
                </div>
             </div>
           } />
         </Routes>
      </main>
    </div>
  );
}
