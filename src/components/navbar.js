"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaSearch, FaRegUserCircle, FaCog } from 'react-icons/fa';
import ThemeSwitch from './theme-switch';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery(''); // Clear search input after navigating
        }
    };
    return (
        <header className='p-4 bg-foreground/5 bg-opacity-70 backdrop-blur-md shadow-lg'>
            <div className="container">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
                        <span className="text-primary">Cine</span>Sphere
                    </Link>
                    <form onSubmit={handleSearch} className="flex-grow max-w-lg mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Find movies, shows..."
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                                <FaSearch size={18} />
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center space-x-6">
                        <Link href="/watchlist" className="transition-colors duration-200">
                            My Watchlist
                        </Link>
                        <Link href="/profile" className="transition-colors duration-200">
                            <FaRegUserCircle size={24} />
                        </Link>
                        <Link href="/settings" className="transition-colors duration-200">
                            <FaCog size={22} />
                        </Link>
                        <ThemeSwitch/>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
