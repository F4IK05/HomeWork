import { Link } from "react-router-dom";

const Register: React.FC = () => {
    return (
            <div className="w-full max-w-md forms rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Register
                </h2>
                <form className="space-y-4">
                    <div>
                        <label className="block mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 border rounded-lg  outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-lg outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full text-white py-2 rounded-lg button-theme"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="ml-1 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
    );
};

export default Register;
