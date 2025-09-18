import { Link } from "react-router-dom";
import "../styles/theme.css";

const NotFound: React.FC = () => {
  return (
    <div className="notFound-form">
      <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
      <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ maxWidth: "400px", marginBottom: "2rem" }}>
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          background: "var(--primary-color)",
          color: "var(--text-color)",
          borderRadius: "8px",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
