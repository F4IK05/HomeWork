import Image from "next/image";
import Link from "next/link";

const footerLinks = {
    about: {
        title: "About",
        links: [
            { label: "About us", href: "/about" },
            { label: "Features", href: "/features" },
            { label: "News & Blogs", href: "/news" },
        ],
    },
    contact: {
        title: "Contact",
        links: [
            { label: "Instagram", href: "https://instagram.com" },
            { label: "Twitter", href: "https://twitter.com" },
            { label: "Facebook", href: "https://facebook.com" },
        ],
    },
    support: {
        title: "Support",
        links: [
            { label: "FAQs", href: "/faqs" },
            { label: "Support Centre", href: "/support" },
            { label: "Feedback", href: "/feedback" },
        ],
    },
};

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] py-10 px-6 md:px-16">
            <div className="container mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
                <div className="flex-shrink-0">
                    <Image
                        src="/logo.png"
                        alt="Saudi - Welcome to Arabia"
                        width={150}
                        height={83}
                        className="w-[120px] md:w-[150px] h-auto"
                    />
                </div>

                <div className="flex flex-wrap gap-15 md:gap-20">
                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title} className="flex flex-col gap-3">
                            <h4 className="text-white font-semibold text-sm">
                                {section.title}
                            </h4>
                            <ul className="flex flex-col gap-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-white transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
