import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallbackPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Если уже обрабатывали, не выполняем снова
        if (hasProcessed.current) {
            console.log("Already processed, skipping");
            return;
        }

        const authenticateWithGoogle = async () => {
            try {
                const queryParams = new URLSearchParams(window.location.search);
                const code = queryParams.get("code");

                if (!code) {
                    throw new Error("Authorization code not found");
                }

                console.log("Sending code to backend...");
                const response = await axios.post(`http://localhost:5101/api/Auth/google/callback?code=${code}`);
                
                console.log("Backend response received:");
                console.log("Status:", response.status);
                console.log("Response data:", response.data);
                console.log("PICTURE received from backend:", response.data.data.picture);

                if (response.data?.success) {
                    // Помечаем как обработанное
                    hasProcessed.current = true;

                    if (response.data.isNewUser) {
                        console.log("New user detected, redirecting to sign up");
                        window.history.replaceState({}, document.title, window.location.pathname);

                        navigate("/sign_up", {
                            state: {
                                fromGoogle: true,
                                email: response.data.data.email,
                                suggestedUsername: response.data.data.suggestedUserName,
                                id: response.data.data.googleId,
                                name: response.data.data.name || "",
                                picture: response.data.data.picture || "",
                            }
                        });
                        
                    } else {
                        console.log("Existing user, processing login");
                        const { accessToken, userName, email, picture } = response.data.data;

                        if (accessToken) {
                            console.log("Access token received:", accessToken);
                            localStorage.setItem("token", accessToken);
                            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

                            login(accessToken, userName, email, picture);
                            window.history.replaceState({}, document.title, window.location.pathname);
                            navigate("/", { replace: true });
                        } else {
                            console.error("No access token in response");
                            throw new Error("No access token received");
                        }
                    }
                } else {
                    console.error("Backend returned success: false");
                    throw new Error("Google authentication failed");
                }
            } catch (err) {
                hasProcessed.current = true;
                
                console.error("Google authentication error:", err);
                console.error("Error response:", err.response?.data);
                
                window.history.replaceState({}, document.title, window.location.pathname);
                navigate("/sign_in", {
                    state: {
                        error: err.response?.data?.error || err.message || "Google authentication failed"
                    }
                });
            }
        };

        authenticateWithGoogle();
    }, [login, navigate]);

    return <div>Processing Google login...</div>;
};

export default GoogleCallbackPage;