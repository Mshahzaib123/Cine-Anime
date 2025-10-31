"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import LoadingSkeleton from '@/components/loading-skeleton';
import Pagination from '@/components/pagination';
import { fetchTrending } from '@/lib/api';
import ThemeButton from '@/components/theme-button';

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
                <div className="flex flex-col gap-2" data-animate="up">
                    <div className="flex items-center gap-3">
                        <FiTrendingUp className="text-primary w-10 h-10" />
                        <h1 className="heading-h1 text-foreground">Trending</h1>
                    </div>
                    <p className="large text-foreground/70">
                        Discover what is popular right now
                    </p>
                </div>
                <div className="flex items-center justify-between mt-6 mb-16" data-animate="up" data-delay="0.1">
                    <div className="flex items-center gap-2 bg-foreground/5 p-2 rounded-full">
                        {[
                            { label: "All", value: "all" },
                            { label: "Movies", value: "movie" },
                            { label: "TV Shows", value: "tv" },
                        ].map((item) => (
                            <ThemeButton
                                key={item.value}
                                size="sm"
                                variant={mediaType === item.value ? "fill" : "ghost"}
                                className="border border-transparent"
                                onClick={() => setMediaType(item.value)}
                            >
                                {item.label}
                            </ThemeButton>
                        ))}
                    </div>
                    <div className="flex items-center gap-2 bg-foreground/5 p-2 rounded-full">
                        {[
                            { label: "Today", value: "day" },
                            { label: "This Week", value: "week" },
                        ].map((item) => (
                            <ThemeButton
                                key={item.value}
                                size="sm"
                                variant={timeWindow === item.value ? "fill" : "ghost"}
                                className="border border-transparent"
                                onClick={() => setTimeWindow(item.value)}
                            >
                                {item.label}
                            </ThemeButton>
                        ))}
                    </div>
                </div>
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