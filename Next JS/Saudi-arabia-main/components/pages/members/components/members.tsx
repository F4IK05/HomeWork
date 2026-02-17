import { useEffect, useState } from "react";
import MembersCard from "./members-card";

// Интерфейс для работы с GitHub User
interface GitHubUser {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    type: string;
}

export default function MembersPage() {
    const [ users, setUsers ] = useState<GitHubUser[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("https://api.github.com/users");
                const data = await response.json();
                
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setError("Failed to load members. Please try again later.");
                }
            } catch (error) {
                console.error("Error fetching users:", error);
                setError("Something went wrong. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 flex justify-center">
                <div className="text-gray-400 text-lg tracking-wide">Loading...</div>
            </div>
        );
    }

    if (error || users.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="border border-white/10 p-12 text-center max-w-md mx-auto">
                    <p className="text-white text-lg font-medium tracking-wide mb-2">
                        Unable to load data
                    </p>
                    <p className="text-gray-500 text-sm">
                        {error || "Please try again later."}
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-6 px-8 py-3 border border-white/20 cursor-pointer text-sm tracking-wider uppercase hover:bg-white/5 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map((user) => (
                    <MembersCard key={user.id} user={user} />)
                )}
            </div>

        </div>
    )
}