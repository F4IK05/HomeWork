import React from "react";
import { useTranslation } from "react-i18next";

const NotificationsSection: React.FC = () => {
  const { t } = useTranslation();

  const items = [
    { title: t("email_notifications"), desc: t("email_notifications_desc") },
    { title: t("push_notifications"), desc: t("push_notifications_desc") },
    { title: t("sms_notifications"), desc: t("sms_notifications_desc") },
    { title: t("security_notifications"), desc: t("security_notifications_desc") },
    { title: t("marketing_messages"), desc: t("marketing_messages_desc") },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">{t("notifications")}</h2>

      <div className="space-y-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 bg-[#212124] rounded-lg border border-gray-700 hover:bg-[#28282c] transition"
          >
            <div>
              <h3 className="text-white font-medium">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-blue-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSection;
