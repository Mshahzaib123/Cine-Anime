import React from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-foreground/5 border-t border-foreground/10 mt-16">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center">
                            <span className="text-primary heading-h5 font-bold">Eiga</span>
                            <span className="text-foreground heading-h5 font-bold">Pulse</span>
                        </Link>
                        <p className="text-foreground/70 small">
                            Your ultimate destination for discovering movies, TV shows, and anime. 
                            Stream, explore, and enjoy unlimited entertainment.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <FiGithub className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://twitter.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="Instagram"
                            >
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a 
                                href="mailto:contact@eigapulse.com"
                                className="p-2 rounded-full bg-foreground/10 text-foreground/70 hover:bg-primary hover:text-white transition-all duration-300"
                                aria-label="Email"
                            >
                                <FiMail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="heading-h6 text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/anime" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Anime
                                </Link>
                            </li>
                            <li>
                                <Link href="/watchlist" className="text-foreground/70 hover:text-primary transition-colors small">
                                    My Watchlist
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="heading-h6 text-foreground mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/categories?genre=28" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Action
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?genre=35" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Comedy
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?genre=18" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Drama
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories?genre=27" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Horror
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="heading-h6 text-foreground mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors small">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors small">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-foreground/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-foreground/60 small">
                        © {currentYear} EigaPulse. All rights reserved.
                    </p>
                    <p className="text-foreground/60 small">
                        Powered by{' '}
                        <a 
                            href="https://www.themoviedb.org/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            TMDB
                        </a>
                        {' '}and{' '}
                        <a 
                            href="https://jikan.moe/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                        >
                            Jikan API
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;