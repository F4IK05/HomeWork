import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        const authenticateWithGoogle = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const code = queryParams.get("code");

                if (!code) {
                    throw new Error("Authorization code not found");
                }

                const response = await axios.post(`http://localhost:5101/api/Auth/google/callback?code=${code}`);

                console.log("response:", response);

                if (response.data?.success) {
                    if (response.data.isNewUser) {
                        navigate("/sign_up", {
                            state: {
                                fromGoogle: true,
                                email: response.data.data.email,
                                suggestedUsername: response.data.data.suggestedUserName,
                                id: response.data.data.googleId,
                                name: response.data.data.name || "",       // имя пользователя из Google
                                picture: response.data.data.picture || "",  // ссылка на аватар
                            }
                        });
                    } else {
                        const { accessToken, userName, email, picture } = response.data.data;

                        if (accessToken) {
                            localStorage.setItem("token", accessToken);
                            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                            login(accessToken, userName, email, picture);
                            navigate("/", { replace: true });
                        } else {
                            throw new Error("No access token received");
                        }
                    }

                } else {
                    throw new Error("Google authentication failed");
                }
            } catch (err) {
                console.error("Google authentication error:", err);
                navigate("/sign_in", {
                    state: {
                        error: err.response?.data?.error || "Google authentication failed"
                    }
                });
            }
        };

        authenticateWithGoogle();
    }, [login, navigate]);

    return <div>Processing Google login...</div>;
};

export default GoogleCallbackPage;