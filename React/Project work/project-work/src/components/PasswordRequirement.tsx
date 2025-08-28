// components/PasswordRequirements.jsx
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const PasswordRequirements = ({ password, className = "" }) => {
  const { t } = useTranslation();

  const requirements = [
    {
      id: 'length',
      test: password.length >= 8,
      text: t("pass_must_be_at_least_8_characters_long")
    },
    {
      id: 'letter',
      test: /(?=.*[A-Za-z])/.test(password),
      text: t("pass_must_contain_at_least_one_letter")
    },
    {
      id: 'number',
      test: /(?=.*\d)/.test(password),
      text: t("pass_must_contain_at_least_one_number")
    },
    {
      id: 'special',
      test: /(?=.*[@$!%*?&])/.test(password),
      text: t("pass_must_contain_at_least_one_special_character")
    }
  ];

  return (
    <div className={`font-medium text-white text-sm flex flex-col gap-1 ${className}`}>
      <p className="text-sm sm:text-base">{t("pass_requirements")}:</p>
      {requirements.map((requirement) => (
        <div key={requirement.id} className="p-1 flex gap-1">
          <div className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all ${
            requirement.test ? "bg-green-400" : "bg-slate-600 border border-gray-400"
          }`}>
            {requirement.test ? (
              <Check strokeWidth={3} className="w-3 h-3 text-white" />
            ) : (
              <div className="w-1 h-1 sm:w-2 sm:h-2 bg-slate-400 rounded-full"></div>
            )}
          </div>
          <p className={`flex-1 text-xs sm:text-sm transition-colors duration-300 ${
            requirement.test ? 'text-green-300' : 'text-white/60'
          }`}>
            {requirement.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PasswordRequirements;