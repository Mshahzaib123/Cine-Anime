"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FiStar, FiTrendingUp } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import LoadingSkeleton from '@/components/loading-skeleton';
import Pagination from '@/components/pagination';
import { fetchTopRated, fetchPopular } from '@/lib/api';

const SuggestedPage = () => {
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaType, setMediaType] = useState('movie');
    const [contentType, setContentType] = useState('top_rated'); // top_rated, popular
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    const loadContent = useCallback(async () => {
        setLoading(true);
        try {
            let data;
            if (contentType === 'top_rated') {
                data = await fetchTopRated(mediaType);
            } else {
                data = await fetchPopular(mediaType);
            }
            setContent(data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Failed to load suggestions:', error);
        } finally {
            setLoading(false);
        }
    }, [mediaType, contentType]);

    useEffect(() => {
        loadContent();
    }, [loadContent]);

    // Pagination logic
    const totalPages = Math.ceil(content.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = content.slice(startIndex, startIndex + itemsPerPage);

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
                        <FiStar className="text-primary w-10 h-10" />
                        <h1 className="heading-h1 text-foreground">Suggested For You</h1>
                    </div>
                    <p className="large text-foreground/70">
                        Discover top-rated and popular content based on your preferences
                    </p>
                </div>

                {/* Filters */}
                <div className="space-y-4 mb-8">
                    {/* Content Type Filter */}
                    <div data-animate="up" data-delay="0.1">
                        <p className="text-foreground/60 font-semibold mb-3">Show Me:</p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <button
                                onClick={() => setContentType('top_rated')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    contentType === 'top_rated'
                                        ? 'bg-primary text-white shadow-shadow'
                                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                <FiStar className="inline w-4 h-4 mr-2" />
                                Top Rated
                            </button>
                            <button
                                onClick={() => setContentType('popular')}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    contentType === 'popular'
                                        ? 'bg-primary text-white shadow-shadow'
                                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                }`}
                            >
                                <FiTrendingUp className="inline w-4 h-4 mr-2" />
                                Popular
                            </button>
                        </div>
                    </div>

                    {/* Media Type Filter */}
                    <div data-animate="up" data-delay="0.2">
                        <p className="text-foreground/60 font-semibold mb-3">Media Type:</p>
                        <div className="flex items-center gap-3 flex-wrap">
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
                </div>

                {/* Info Banner */}
                <div 
                    className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8"
                    data-animate="up"
                    data-delay="0.3"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <FiStar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="heading-h6 text-foreground mb-2">
                                Personalized Recommendations
                            </h3>
                            <p className="text-foreground/70 small">
                                These suggestions are based on {contentType === 'top_rated' ? 'the highest-rated' : 'the most popular'} {mediaType === 'movie' ? 'movies' : 'TV shows'}. 
                                Add items to your watchlist to get even better recommendations!
                            </p>
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
                            data-delay="0.4"
                        >
                            {currentItems.map((item) => (
                                <CommonCard
                                    key={item.id}
                                    {...item}
                                    media_type={mediaType}
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
                            No Suggestions Available
                        </h2>
                        <p className="large text-foreground/60">
                            Check back later for recommendations
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default SuggestedPage;