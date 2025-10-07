import { useEffect, useState } from "react";
import { X, Mail } from "lucide-react";
import { AuthService } from "@/services/AuthService";

const VerifyToast = ({ email }: { email: string }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 10000; // 10 сек
    const step = 100 / (duration / 100);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p <= 0) {
          clearInterval(interval);
          setVisible(false);
        }
        return p - step;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const handleResend = async () => {
    const token = localStorage.getItem("token");
    if (token) await AuthService.sendVerificationEmail(token);
    setVisible(false);
  };

  return (
    <div className="z-100 fixed bottom-6 right-6 bg-[#222224] text-white p-4 rounded-lg shadow-lg border border-gray-600 w-[320px] animate-fadeIn">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-400" />
          <p className="font-semibold">Verify your email</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-gray-400 hover:text-white">
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-gray-300 mb-2">
        Please verify your email <span className="text-blue-400">{email}</span> to unlock all features.
      </p>
      <button
        onClick={handleResend}
        className="text-sm text-blue-400 hover:underline"
      >
        Resend verification link
      </button>

      {/* Индикатор таймера */}
      <div className="h-1 bg-blue-500 mt-3 rounded-full" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default VerifyToast;
