import React from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';
import ThemeButton from './theme-button';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground/5 border-t border-foreground/5">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-28">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center">
                            <span className="text-primary heading-h5 font-bold">Eiga</span>
                            <span className="text-foreground heading-h5 font-bold">Pulse</span>
                        </Link>
                        <div className="flex flex-col items-start gap-3">
                            <ThemeButton 
                                size="icon"
                                variant="outline"
                                href="https://github.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <FiGithub className="w-5 h-5" />
                            </ThemeButton>
                            <ThemeButton 
                                size="icon"
                                variant="outline"
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <FiTwitter className="w-5 h-5" />
                            </ThemeButton>
                            <ThemeButton 
                                size="icon"
                                variant="outline"
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <FiInstagram className="w-5 h-5" />
                            </ThemeButton>
                            <ThemeButton 
                                size="icon"
                                variant="outline"
                                href="mailto:contact@eigapulse.com"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="Email"
                            >
                                <FiMail className="w-5 h-5" />
                            </ThemeButton>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="base font-bold text-foreground/40">Quick Links</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href="/" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/anime" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link href="/watchlist" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    My Watchlist
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="base font-bold text-foreground/40">Categories</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href="/categories?genre=28" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Action
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?genre=35" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Comedy
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?genre=18" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Drama
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?genre=27" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Horror
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h3 className="base font-bold text-foreground/40">Support</h3>
                        <ul className="flex flex-col gap-2">
                            <li>
                                <Link href="/about" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="heading-h6 text-foreground hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-foreground/5 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-foreground/60 base">
                        © {currentYear} EigaPulse. All rights reserved.
                    </p>
                    <p className="flex items-center gap-0.5 text-foreground/60 base">
                        Powered by 
                        <Link 
                            href="https://www.themoviedb.org/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            TMDB
                        </Link>
                        and
                        <Link 
                            href="https://jikan.moe/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Jikan API
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;