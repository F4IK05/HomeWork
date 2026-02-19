"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLoading } from "@/components/providers/loading-provider";
import Image from "next/image";
import { DitherImage } from "../ui/dither-image";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "../navbar/logo";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "PROJECTS", href: "/projects" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
];

export function Navbar() {
    const pathname = usePathname();
    const { isLoading } = useLoading();

    if (isLoading) {
        return null;
    }

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-sm border-b border-green-500/30 select-none"
        >
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between font-mono text-green-500">

                <div className="flex items-center gap-2">
                    <Logo />
                </div>

                {/* desktop */}
                <nav className="hidden sm:flex gap-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.name} href={link.href} className="relative group overflow-hidden px-2 py-1">
                                <span className={`absolute inset-0 bg-green-500 transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} />

                                <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-black' : 'group-hover:text-black'}`}>
                                    [{link.name}]
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* mobile menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="sm:hidden border border-green-500/50 px-2 py-1 hover:bg-green-500 hover:text-black transition-colors">
                            [ MENU ]
                        </button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[300px] bg-black border-l border-green-500/30 text-green-500"
                    >
                        <SheetHeader className="text-left">
                            <SheetTitle className="sr-only">
                                Navigation Menu
                            </SheetTitle>
                            <SheetDescription className="sr-only">
                                Main navigation links
                            </SheetDescription>
                            <Logo isMobile/>
                        </SheetHeader>

                        <nav className="flex flex-col mt-8 gap-2 font-mono">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`
                                            block border-l-2 transition-all px-4 py-3
                                            ${isActive
                                                ? 'border-green-500 bg-green-500/10 text-green-400'
                                                : 'border-transparent hover:border-green-500 hover:bg-green-500/10'
                                            }
                                        `}
                                    >
                                        <span className="text-green-700 mr-2">{">"}</span>
                                        {link.name}
                                        
                                    </Link>
                                );
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </motion.header>
    );
}   
