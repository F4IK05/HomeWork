import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const GoogleAuthCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasRun = useRef(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const code = searchParams.get("code");

    if (!code) {
      console.error("No authorization code in URL");
      return;
    }

    const handleGoogleCallback = async () => {
      try {
        const res = await fetch(`http://localhost:5017/api/Auth/google/callback?code=${code}`, {
          method: "POST",
        });

        const data = await res.json();
        console.log("Google callback response:", data);

        if (!data.success) {
          console.error("Google login failed:", data.error);
          return;
        }

        if (data.isNewUser) {
          navigate("/sign-up", { state: { fromGoogle: true, ...data.data } });
        } else {
          const { accessToken, userName, email, picture } = data.data;
          await login(accessToken, userName, email, picture);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error("Google auth error:", err);
      }
    };

    handleGoogleCallback();
  }, [navigate, login, searchParams]);

  return (
    <div className="min-h-screen flex justify-center items-center text-white">
      Processing Google authentication...
    </div>
  );
};

export default GoogleAuthCallback;
