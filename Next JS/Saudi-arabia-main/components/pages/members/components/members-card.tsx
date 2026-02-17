import Image from "next/image";
import Link from "next/link";

interface MembersCardProps {
    user: {
        id: number;
        login: string;
        avatar_url: string;
        html_url: string;
        type: string;
    };
}

export default function MembersCard({ user }: MembersCardProps) {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>

            <div className="relative p-6 flex flex-col items-center">
                <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-lg group-hover:ring-blue-400 transition-all duration-300">
                        <Image
                            src={user.avatar_url}
                            alt={user.login}
                            width={96}
                            height={96}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        />
                    </div>

                </div>

                <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {user.login}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        ID: {user.id}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                        {user.type}
                    </span>
                </div>

                <div className="flex gap-2 w-full">
                    <Link
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors text-center"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}