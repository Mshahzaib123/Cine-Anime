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
        <header className="bg-foreground/5 py-4 backdrop-blur-md shadow-lg">
            <div className="container">
                <nav className="flex items-center justify-between gap-4">
                    <Link href="/" className="flex items-center">
                        <span className="text-primary heading-h6 font-bold">Eiga</span>
                        <span className="text-foreground heading-h6 font-bold">Pulse</span>
                    </Link>
                    <form onSubmit={handleSearch} className="w-full max-w-[600px]">
                        <ThemeInput
                            type="text"
                            placeholder="Search movies, anime, shows..."
                            leftIcon={FiSearch}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>
                    <div className="flex items-center gap-1">
                        <ThemeButton href="/" variant="ghost" size='icon'>
                            <FiBookmark className="h-5 w-5" />
                        </ThemeButton>
                        <ThemeButton href="/" variant="ghost" size="icon">
                            <FiUser className="h-5 w-5" />
                        </ThemeButton>
                        <ThemeButton href="/" variant="ghost" size="icon">
                            <FiSettings className="h-5 w-5" />
                        </ThemeButton>
                        <ThemeSwitch />
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;