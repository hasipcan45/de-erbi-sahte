import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PropertyType } from "../types";
import { Building2, Landmark, Home as HomeIcon, ArrowRight, Upload, Info, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState<PropertyType>(PropertyType.RESIDENTIAL);
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    city: "",
    district: "",
    email: "",
    details: "",
  });

  const propertyTypes = [
    { title: "Konut", value: PropertyType.RESIDENTIAL, icon: HomeIcon, desc: "Daire, Villa, Müstakil Ev" },
    { title: "Arsa", value: PropertyType.PLOT, icon: Landmark, desc: "İmarlı, Tarla, Bahçe" },
    { title: "Ticari", value: PropertyType.COMMERCIAL, icon: Building2, desc: "Ofis, Dükkan, Depo" },
  ];

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
      return;
    }

    // Step 2 logic
    if (!user) {
      // Not logged in -> Redirect to register
      navigate("/register?redirect=valuation");
      return;
    }

    if (!user.isSubscribed) {
      // Logged in but no subscription -> Redirect to payment (mocked)
      alert("Aboneliğiniz bulunmamaktadır. Ödeme sayfasına yönlendiriliyorsunuz...");
      // navigate("/payment");
      return;
    }

    // Success flow
    setIsSubmitted(true);
  };

  return (
    <div className="relative isolate">
      {/* Hero Section */}
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div className="lg:pr-8">
              <div className="lg:max-w-lg">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
                >
                  Taşınmazınızın Gerçek Değerini Öğrenin
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-6 text-lg leading-8 text-gray-600"
                >
                  Uzman görüşü ve derinlemesine piyasa analizi ile mülkünüz için 
                  en doğru raporu hazırlayalım. Hızlı, güvenilir ve profesyonel değerleme.
                </motion.p>
                
                <div className="mt-10 flex items-center gap-x-6">
                   <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                     <Info className="h-4 w-4" />
                     <span>Süreç Yaklaşık 24-48 Saat Sürer</span>
                   </div>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl lg:p-10"
            >
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-10 text-center"
                >
                   <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                     <CheckCircle2 className="h-10 w-10" />
                   </div>
                   <h2 className="mt-6 text-2xl font-bold text-gray-900">Talebiniz Alındı</h2>
                   <p className="mt-4 text-gray-600">
                     Raporunuz oluşturulmaya başlandı. Uzmanlarımız değerleme çalışmasını 
                     tamamladığında {formData.email} adresine PDF raporu iletilecektir.
                   </p>
                   <button 
                     onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                     }}
                     className="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-700"
                   >
                     Yeni Bir Rapor Talep Et
                   </button>
                </motion.div>
              ) : (
                <form onSubmit={handleNext}>
                <div className="space-y-8">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-xl font-semibold text-gray-900">Gayrimenkul Türünü Seçin</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {propertyTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setPropertyType(type.value)}
                              className={cn(
                                "relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all hover:border-blue-300",
                                propertyType === type.value 
                                  ? "border-blue-600 bg-blue-50 shadow-sm" 
                                  : "border-gray-100 bg-gray-50/50"
                              )}
                            >
                              <type.icon className={cn(
                                "h-8 w-8",
                                propertyType === type.value ? "text-blue-600" : "text-gray-400"
                              )} />
                              <span className="text-sm font-bold text-gray-900">{type.title}</span>
                              <span className="hidden text-[10px] text-gray-500 sm:block">{type.desc}</span>
                            </button>
                          ))}
                        </div>

                        <div className="space-y-4 pt-4">
                           <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                               <label className="text-sm font-medium text-gray-700">İl</label>
                               <input 
                                 type="text" 
                                 required
                                 className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                                 placeholder="Örn: İstanbul"
                                 value={formData.city}
                                 onChange={e => setFormData({...formData, city: e.target.value})}
                               />
                             </div>
                             <div className="space-y-2">
                               <label className="text-sm font-medium text-gray-700">İlçe</label>
                               <input 
                                 type="text" 
                                 required
                                 className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                                 placeholder="Örn: Kadıköy"
                                 value={formData.district}
                                 onChange={e => setFormData({...formData, district: e.target.value})}
                               />
                             </div>
                           </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <h2 className="text-xl font-semibold text-gray-900">Son Detaylar ve İletişim</h2>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Taşınmaz Detayları (m², Oda Sayısı, Kat, vb.)</label>
                          <textarea 
                            rows={4}
                            required
                            className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                            placeholder="Mülkünüz hakkında ek bilgileri buraya yazın..."
                            value={formData.details}
                            onChange={e => setFormData({...formData, details: e.target.value})}
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Raporun Gönderileceği E-posta</label>
                          <input 
                            type="email" 
                            required
                            className="block w-full rounded-lg border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                            placeholder="adres@mail.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6 text-center">
                          <Upload className="mx-auto h-8 w-8 text-gray-400" />
                          <div className="mt-2 text-sm text-gray-600">
                             <span className="font-semibold text-blue-600">Fotoğraf Yükle</span> (Opsiyonel)
                          </div>
                          <p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-4">
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 rounded-full border border-gray-300 py-4 text-sm font-semibold text-gray-700 transition-all hover:bg-gray-50"
                      >
                        Geri
                      </button>
                    )}
                    <button
                      type="submit"
                      className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 py-4 text-sm font-semibold text-white shadow-xl transition-all hover:bg-blue-700 active:scale-[0.98]"
                    >
                      {step === 1 ? "Devam Et" : "Rapor Al"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
