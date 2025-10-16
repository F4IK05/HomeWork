import React from "react";
import { ChevronRight, Key, Lock } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SecuritySectionProps {
  passwordSet: boolean;
  openPasswordModal: () => void;
  openLinkModal: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
  passwordSet,
  openPasswordModal,
  openLinkModal,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">{t("security")}</h2>

      <div className="space-y-4">
        {passwordSet ? (
          <button
            onClick={openPasswordModal}
            className="group w-full bg-[#212124] hover:bg-[#28282c] text-white font-semibold rounded-2xl p-4 transition-all flex items-center justify-between border border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 group-hover:bg-orange-500/30 rounded-lg transition-colors">
                <Key className="w-5 h-5 text-orange-400" />
              </div>
              <span>{t("change_password")}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </button>
        ) : (
          <button
            onClick={openLinkModal}
            className="group w-full bg-[#212124] hover:bg-[#28282c] text-white font-semibold rounded-2xl p-4 transition-all flex items-center justify-between border border-gray-700"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg transition-colors">
                <Lock className="w-5 h-5 text-green-400" />
              </div>
              <span>{t("link_password")}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SecuritySection;
