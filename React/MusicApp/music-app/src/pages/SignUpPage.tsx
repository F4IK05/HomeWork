import React, { useEffect, useState } from "react";
import EmailStep from "@/components/auth/steps/EmailStep";
import PasswordStep from "@/components/auth/steps/PasswordStep";
import UsernameStep from "@/components/auth/steps/UsernameStep";
import { useLocation } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const location = useLocation();
  const fromGoogle = location.state?.fromGoogle || false;

  const [step, setStep] = useState(fromGoogle ? 3 : 1);
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(location.state?.suggestedUserName || "");

  // Если пришёл OAuth-пользователь — автоматически пропускаем первые шаги
  useEffect(() => {
    if (fromGoogle) {
      setStep(3);
    }
  }, [fromGoogle]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#171719]">
      <div className="w-full max-w-md bg-[#222224] p-8 rounded-lg">
        {step === 1 && (
          <EmailStep
            email={email}
            setEmail={setEmail}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <PasswordStep
            password={password}
            confirmPassword={confirmPassword}
            setPassword={setPassword}
            setConfirmPassword={setConfirmPassword}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <UsernameStep
            username={username}
            setUsername={setUsername}
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            location={location}
            onBack={() => setStep(fromGoogle ? 3 : 2)} // нельзя назад, если Google
          />
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
