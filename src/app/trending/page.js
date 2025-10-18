"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import LoadingSkeleton from '@/components/loading-skeleton';
import Pagination from '@/components/pagination';
import { fetchTrending } from '@/lib/api';

const TrendingPage = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaType, setMediaType] = useState('all');
    const [timeWindow, setTimeWindow] = useState('week');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    const loadContent = useCallback(async () => {
        setLoading(true);
        try {
            const data = await fetchTrending(mediaType, timeWindow);
            setContent(data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Failed to load trending:', error);
        } finally {
            setLoading(false);
        }
    }, [mediaType, timeWindow]);

    useEffect(() => {
        loadContent();
    }, [loadContent]);

    // Pagination logic
    const totalPages = Math.ceil(content.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = content.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen py-16">
            <div className="container">
                {/* Header */}
                <div className="mb-12" data-animate="up">
                    <div className="flex items-center gap-3 mb-2">
                        <FiTrendingUp className="text-primary w-10 h-10" />
                        <h1 className="heading-h1 text-foreground">Trending</h1>
                    </div>
                    <p className="large text-foreground/70">
                        Discover what is popular right now
                    </p>
                </div>

                {/* Filters */}
                <div className="space-y-4 mb-8">
                    {/* Media Type Filter */}
                    <div data-animate="up" data-delay="0.1">
                        <p className="text-foreground/60 font-semibold mb-3">Media Type:</p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setMediaType('all')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    mediaType === 'all'
                                    ? 'bg-primary text-white shadow-shadow'
                                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setMediaType('movie')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    mediaType === 'movie'
                                    ? 'bg-primary text-white shadow-shadow'
                                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                Movies
                            </button>
                            <button
                                onClick={() => setMediaType('tv')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    mediaType === 'tv'
                                    ? 'bg-primary text-white shadow-shadow'
                                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                TV Shows
                            </button>
                        </div>
                    </div>

                    {/* Time Window Filter */}
                    <div data-animate="up" data-delay="0.2">
                        <p className="text-foreground/60 font-semibold mb-3">Time Period:</p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setTimeWindow('day')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    timeWindow === 'day'
                                    ? 'bg-primary text-white shadow-shadow'
                                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                Today
                            </button>
                            <button
                                onClick={() => setTimeWindow('week')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    timeWindow === 'week'
                                    ? 'bg-primary text-white shadow-shadow'
                                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                This Week
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                {loading ? (
                    <LoadingSkeleton count={18} />
                ) : currentItems.length > 0 ? (
                    <>
                        <div 
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
                            data-animate="zoom"
                            data-delay="0.3"
                        >
                            {currentItems.map((item) => (
                                <CommonCard
                                    key={item.id}
                                    {...item}
                                    media_type={item.media_type || mediaType}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                ) : (
                    <div className="text-center py-24" data-animate="up">
                        <h2 className="heading-h3 text-foreground mb-4">
                            No Trending Content
                        </h2>
                        <p className="large text-foreground/60">
                            Check back later for updates
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default TrendingPage;