"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import { useTablet } from "@/hooks/use-tablet";

const navLinks = [
    { href: "/destenations", label: "Destenations" },
    { href: "/members", label: "Members" },
    { href: "/about-us", label: "About Us" },
];

export default function Navbar() {
    const isTablet = useTablet();

    return (
        <nav className="container mx-auto flex justify-between items-center py-4 px-6 md:px-10 relative z-50">
            <Link href="/">
                <Image 
                    src="/logo.png" 
                    alt="logo" 
                    width={213} 
                    height={118}
                    className={isTablet ? "w-[150px] h-auto" : "w-[213px] h-auto"}
                />
            </Link>

            {/* Desktop menu */}
            {!isTablet && (
                <ul className="flex gap-14">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.href}
                            href={link.href} 
                            className="text-2xl font-medium text-white hover:text-gray-300 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </ul>
            )}

            {/* Mobile burger menu */}
            {isTablet && (
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="text-white p-2">
                            <Menu size={32} />
                        </button>
                    </SheetTrigger>
                    <SheetContent 
                        side="right" 
                        className="bg-black border-l border-white/10 w-[280px] sm:w-[320px] p-6"
                    >
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <nav className="flex flex-col gap-8 mt-16">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xl font-medium text-white hover:text-gray-300 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            )}
        </nav>
    );
}