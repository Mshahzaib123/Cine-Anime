"use client";

import React, { useState, useEffect } from 'react';
import { FiBookmark, FiTrash2 } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import WatchlistCard from './watchlist-card';

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWatchlist();
    }, []);

    const loadWatchlist = () => {
        try {
            const saved = localStorage.getItem('watchlist');
            const items = saved ? JSON.parse(saved) : [];
            setWatchlist(items);
        } catch (error) {
            console.error('Failed to load watchlist:', error);
            setWatchlist([]);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWatchlist = (id) => {
        const updated = watchlist.filter(item => item.id !== id);
        localStorage.setItem('watchlist', JSON.stringify(updated));
        setWatchlist(updated);
    };

    const clearWatchlist = () => {
        if (window.confirm('Are you sure you want to clear your entire watchlist?')) {
            localStorage.setItem('watchlist', JSON.stringify([]));
            setWatchlist([]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-foreground/60">Loading watchlist...</div>
            </div>
        );
    }

  return (
        <main className="min-h-screen py-16">
            <div className="container">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12" data-animate="up">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <FiBookmark className="text-primary w-10 h-10" />
                            <h1 className="heading-h1 text-foreground">My Watchlist</h1>
                        </div>
                        <p className="large text-foreground/70">
                            {watchlist.length > 0 
                            ? `${watchlist.length} ${watchlist.length === 1 ? 'item' : 'items'} saved`
                            : 'Your watchlist is empty'
                            }
                        </p>
                    </div>

                    {watchlist.length > 0 && (
                        <ThemeButton
                            onClick={clearWatchlist}
                            variant="outline"
                        >
                            <FiTrash2 className="w-5 h-5" />
                            Clear All
                        </ThemeButton>
                    )}
                </div>

                {/* Watchlist Grid */}
                {watchlist.length > 0 ? (
                    <div 
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                        data-animate="zoom"
                        data-delay="0.1"
                    >
                        {watchlist.map((item) => (
                            <WatchlistCard
                                key={item.id}
                                item={item}
                                onRemove={removeFromWatchlist}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div 
                        className="text-center py-24"
                        data-animate="up"
                        data-delay="0.1"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                            <FiBookmark className="w-12 h-12 text-primary" />
                        </div>
                        <h2 className="heading-h3 text-foreground mb-4">
                            Your Watchlist is Empty
                        </h2>
                        <p className="large text-foreground/60 mb-8 max-w-md mx-auto">
                            Start adding movies and TV shows you want to watch. They will appear here!
                        </p>
                        <ThemeButton href="/" size="lg">
                            Explore Content
                        </ThemeButton>
                    </div>
                )}
            </div>
        </main>
    );
};

export default WatchlistPage;