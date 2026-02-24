"use client";
import Link from "next/link";
import "./navbar.css";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "../navbar/logo";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import Marquee from "react-fast-marquee";

gsap.registerPlugin(useGSAP, ScrambleTextPlugin);

const navLinks = [
    { name: "HOME", href: "/"},
    { name: "PROJECTS", href: "/projects"},
    { name: "ABOUT", href: "/about"},
    { name: "CONTACT", href: "/contact"},
];

export function Navbar() {
    const container = useRef<HTMLDivElement>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);
    const pathname = usePathname(); 
    const router = useRouter(); 
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        gsap.set(".menu-link-item-holder", { y: 150 });
        gsap.set(".menu-overlay", { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" });
        gsap.set(".menu-marquee", { yPercent: 100, opacity: 0 }); 

        tl.current = gsap.timeline({ paused: true })
            .to(".menu-overlay", {
                duration: 0.8,
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                ease: "steps(10)" 
            })
            .to(".menu-link-item-holder", {
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "steps(4)",
            }, "-=0.4")
            .to(".menu-marquee", {
                yPercent: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out"
            }, "-=0.2");
            
    }, { scope: container });

    useEffect(() => {
        if (isMenuOpen && tl.current) {
            tl.current.play();
        } else if (tl.current) {
            tl.current.reverse();
        }
    }, [isMenuOpen]);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const textTarget = e.currentTarget.querySelector('.scramble-text');
        
        if (textTarget && !gsap.isTweening(textTarget)) {
            gsap.to(textTarget, {
                duration: 0.6,
                scrambleText: {
                    text: "{original}", 
                    chars: "01X!<>-_\\/[]{}—=+*^?#", 
                    speed: 0.6,
                    revealDelay: 0.1,
                    tweenLength: false
                }
            });
        }
    };

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault(); 

        if (pathname === href) {
            toggleMenu();
            return;
        }

        gsap.to(".menu-overlay-content", {
            duration: 0.35,
            keyframes: [
                { x: -15, skewX: 10, filter: "invert(1) contrast(200%)" },
                { x: 15, skewX: -10, filter: "hue-rotate(90deg)" },
                { x: -5, skewX: 5, filter: "invert(0) blur(2px)" },
                { x: 0, skewX: 0, opacity: 0, filter: "none" } 
            ],
            ease: "none",
            onComplete: () => {
                router.push(href); 
                toggleMenu(); 
                gsap.set(".menu-overlay-content", { clearProps: "all" });
            }
        });
    };

    return (
        <div ref={container} className="menu-container text-green-500 font-mono select-none">
            
            <div className="crt-overlay pointer-events-none"></div>

            <div className={`menu-bar ${isScrolled ? "scrolled" : ""} relative z-50 flex justify-between items-center p-6 bg-black/50 backdrop-blur-sm`}>
                <div className="menu-logo cursor-pointer"><Logo /></div>
                <div className="menu-open cursor-pointer" onClick={toggleMenu}><p>[MENU]</p></div>
            </div>

            <div className="menu-overlay fixed inset-0 z-40 bg-black overflow-hidden">
                
                <div className="menu-overlay-bar relative z-20 flex justify-between items-center">
                    <div className="menu-logo cursor-pointer"><Logo /></div>
                    <div className="menu-close cursor-pointer" onClick={toggleMenu}><p>[CLOSE]</p></div>
                </div>

                <div className="menu-overlay-content relative z-20 h-full flex flex-col justify-center px-6 pb-32">
                    <div className="menu-copy flex flex-col gap-12">
                        
                        <div className="menu-links flex flex-col gap-4">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                
                                return (
                                    <div className="menu-link-item overflow-hidden group" key={index}>
                                        <div className="menu-link-item-holder">
                                            <Link 
                                                href={link.href} 
                                                onClick={(e) => handleNavigate(e, link.href)}
                                                onMouseEnter={handleMouseEnter}
                                                className={`menu-link text-5xl md:text-7xl font-bold flex items-center transition-colors duration-300 text-glow-crt ${isActive ? "text-white" : "text-green-500 hover:text-green-400"}`}
                                            >
                                                <span className={`indicator mr-4 transition-all duration-300 ${isActive ? "text-white opacity-100" : "text-green-400 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"}`}>
                                                    &gt;
                                                </span>
                                                <span className="scramble-text inline-block">
                                                    {link.name}
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="menu-info mt-8">
                            <p>faik.hasanov05@gmail.com</p>
                        </div>
                        
                    </div>
                </div>

                <div className="menu-marquee absolute bottom-0 left-0 w-full z-30 bg-black border-t-2 border-green-500 py-2">
                    <Marquee speed={40} autoFill={true} pauseOnHover={true}>
                        <span className="mx-4 text-xs tracking-widest text-green-500 select-none">
                            [ SYSTEM ONLINE /// SECURE CONNECTION ESTABLISHED /// NAVIGATE SAFELY ] ///
                        </span>
                    </Marquee>
                </div>

            </div>
        </div>
    );
}