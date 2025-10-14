"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeSwitch from './theme-switch';
import ThemeButton from './theme-button';
import ThemeInput from './theme-input';
import {
    FiSearch,
    FiBookmark,
    FiUser,
    FiSettings
} from 'react-icons/fi';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md shadow-lg border-b border-foreground/10">
            <div className="container">
                <nav className="flex items-center justify-between gap-4 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <span className="text-primary heading-h6 font-bold">Eiga</span>
                        <span className="text-foreground heading-h6 font-bold">Pulse</span>
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="w-full max-w-[600px] hidden md:block">
                        <ThemeInput
                            type="text"
                            placeholder="Search movies, anime, shows..."
                            leftIcon={FiSearch}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                        <ThemeButton 
                            href="/watchlist" 
                            variant="ghost" 
                            size='icon'
                            aria-label="Watchlist"
                        >
                            <FiBookmark className="h-5 w-5" />
                        </ThemeButton>
                        <ThemeButton 
                            href="/profile" 
                            variant="ghost" 
                            size="icon"
                            aria-label="Profile"
                        >
                            <FiUser className="h-5 w-5" />
                        </ThemeButton>
                        <ThemeButton 
                            href="/settings" 
                            variant="ghost" 
                            size="icon"
                            aria-label="Settings"
                        >
                            <FiSettings className="h-5 w-5" />
                        </ThemeButton>
                        <ThemeSwitch />
                    </div>
                </nav>

                {/* Mobile Search Bar */}
                <form onSubmit={handleSearch} className="pb-4 md:hidden">
                    <ThemeInput
                        type="text"
                        placeholder="Search..."
                        leftIcon={FiSearch}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        size="sm"
                    />
                </form>
            </div>
        </header>
    );
}

export default Navbar;