import React from "react";
import { useTranslation } from "react-i18next";

const SettingsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">{t("settings")}</h2>

      {/* Язык */}
      <div className="p-6 bg-[#1f1f23] rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">{t("language_region")}</h3>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">{t("interface_language")}</label>
          <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Русский</option>
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Опасная зона */}
      <div className="p-6 bg-red-900/20 border border-red-700 rounded-lg">
        <h3 className="text-lg font-semibold text-red-400 mb-4">{t("danger_zone")}</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">{t("deactivate_account")}</p>
              <p className="text-sm text-gray-400">{t("deactivate_account_desc")}</p>
            </div>
            <button className="px-4 py-2 border border-red-600 text-red-400 rounded-lg hover:bg-red-600 hover:text-white transition">
              {t("deactivate")}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white">{t("delete_account")}</p>
              <p className="text-sm text-gray-400">{t("delete_account_desc")}</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
