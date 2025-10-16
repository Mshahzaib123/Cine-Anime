"use client";

import React, { useState, useEffect } from 'react';
import { FiBookmark, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import ThemeButton from '@/components/theme-button';
import Footer from '@/components/footer';
import RatingStars from '@/components/rating-stars';

const WatchlistCard = ({ item, onRemove }) => {
    const imageUrl = getImageUrl(item.poster_path);
    const year = item.release_date 
        ? new Date(item.release_date).getFullYear() 
        : 'N/A';

    return (
        <div className="group relative">
            <Link 
                href={`/details/${item.id}?type=${item.media_type}`}
                className="block"
            >
                <div className="relative overflow-hidden rounded-2xl bg-foreground/5 transition-all duration-300 hover:scale-105 hover:shadow-shadow">
                    <div className="relative aspect-[2/3] overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-4">
                        <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-foreground/60 text-sm">{year}</span>
                            {item.vote_average > 0 && (
                                <RatingStars rating={item.vote_average} size="sm" showNumber={false} />
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Remove Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onRemove(item.id);
                }}
                className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                aria-label="Remove from watchlist"
            >
                <FiTrash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

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
        <>
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
            <Footer />
        </>
    );
};

export default WatchlistPage;