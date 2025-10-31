"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { FiStar, FiCalendar, FiTrendingUp } from 'react-icons/fi';
import LoadingSkeleton from '@/components/loading-skeleton';
import Pagination from '@/components/pagination';
import { fetchAnime } from '@/lib/api';
import AnimeCard from './anime-card';

const AnimePage = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('popularity'); // popularity, score, upcoming

    const loadAnime = useCallback(async (page) => {
        setLoading(true);
        try {
            const data = await fetchAnime(filter, page);
            setAnimeList(data);
            // Jikan API typically returns 25 items per page, estimate total pages
            setTotalPages(20); // Limiting to 20 pages for demo
        } catch (error) {
            console.error('Failed to load anime:', error);
            setAnimeList([]);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadAnime(currentPage);
    }, [currentPage, loadAnime]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1);
    };

    return (
        <main className="min-h-screen py-16">
            <div className="container">
                {/* Header */}
                <div className="mb-12" data-animate="up">
                    <div className="flex items-center gap-3 mb-2">
                        <FiTrendingUp className="text-primary w-10 h-10" />
                        <h1 className="heading-h1 text-foreground">Anime Discovery</h1>
                    </div>
                    <p className="large text-foreground/70">
                        Explore the best anime from MyAnimeList
                    </p>
                </div>

                {/* Info Banner */}
                <div 
                    className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8"
                    data-animate="up"
                    data-delay="0.1"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <FiStar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h3 className="heading-h6 text-foreground mb-2">
                                Powered by MyAnimeList
                            </h3>
                            <p className="text-foreground/70 small">
                                All anime data is fetched from MyAnimeList via Jikan API. Click on any anime card to view full details on MyAnimeList.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-8" data-animate="up" data-delay="0.2">
                    <p className="text-foreground/60 font-semibold mb-3">Sort By:</p>
                    <div className="flex items-center gap-3 flex-wrap">
                        <button
                            onClick={() => handleFilterChange('popularity')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                filter === 'popularity'
                                ? 'bg-primary text-white shadow-shadow'
                                : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                            }`}
                        >
                            <FiTrendingUp className="inline w-4 h-4 mr-2" />
                            Most Popular
                        </button>
                        <button
                            onClick={() => handleFilterChange('score')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                filter === 'score'
                                ? 'bg-primary text-white shadow-shadow'
                                : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                            }`}
                        >
                            <FiStar className="inline w-4 h-4 mr-2" />
                            Top Rated
                        </button>
                        <button
                            onClick={() => handleFilterChange('upcoming')}
                            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                filter === 'upcoming'
                                ? 'bg-primary text-white shadow-shadow'
                                : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                            }`}
                        >
                            <FiCalendar className="inline w-4 h-4 mr-2" />
                            Upcoming
                        </button>
                    </div>
                </div>

                {/* Anime Grid */}
                {loading ? (
                    <LoadingSkeleton count={18} />
                ) : animeList.length > 0 ? (
                    <>
                        <div 
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
                            data-animate="zoom"
                            data-delay="0.3"
                        >
                            {animeList.map((anime, index) => (
                                <AnimeCard
                                    key={index}
                                    {...anime}
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
                            No Anime Found
                        </h2>
                        <p className="large text-foreground/60">
                            Try changing your filter or check back later
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AnimePage;