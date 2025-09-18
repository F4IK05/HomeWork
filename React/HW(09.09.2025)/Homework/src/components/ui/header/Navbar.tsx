import { Link } from "react-router-dom";

import "../../../styles/theme.css";
import { useThemeContext } from "../../shared/hooks/useThemeContext";

const Navbar: React.FC = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <nav className="navbar">
            <Link to="/">MyApp</Link>
            <div className="flex items-center">
                <div className="mr-10">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
                <button className="button-theme" onClick={toggleTheme}>
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
