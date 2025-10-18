"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiGrid } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import LoadingSkeleton from '@/components/loading-skeleton';
import Pagination from '@/components/pagination';
import { fetchGenres, fetchByGenre } from '@/lib/api';

const CategoriesPage = () => {
    const searchParams = useSearchParams();
    const genreParam = searchParams.get('genre');
    
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(genreParam || '');
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaType, setMediaType] = useState('movie');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    const loadGenres = useCallback(async () => {
        try {
            const data = await fetchGenres(mediaType);
            setGenres(data);
            if (!selectedGenre && data.length > 0) {
                setSelectedGenre(data[0].id.toString());
            }
        } catch (error) {
            console.error('Failed to load genres:', error);
        }
    }, [mediaType, selectedGenre]);

    const loadContent = useCallback(async () => {
        if (!selectedGenre) return;
        
        setLoading(true);
        try {
            const data = await fetchByGenre(selectedGenre, mediaType);
            setContent(data);
            setCurrentPage(1);
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    }, [selectedGenre, mediaType]);

    useEffect(() => {
        loadGenres();
    }, [loadGenres]);

    useEffect(() => {
        if (selectedGenre) {
            loadContent();
        }
    }, [selectedGenre, loadContent]);

    const handleGenreChange = (genreId) => {
        setSelectedGenre(genreId);
        window.history.pushState({}, '', `?genre=${genreId}`);
    };

    // Pagination
    const totalPages = Math.ceil(content.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = content.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const selectedGenreName = genres.find(g => g.id.toString() === selectedGenre)?.name || 'All';

    return (
        <main className="min-h-screen py-16">
            <div className="container">
                {/* Header */}
                <div className="mb-12" data-animate="up">
                    <div className="flex items-center gap-3 mb-2">
                        <FiGrid className="text-primary w-10 h-10" />
                        <h1 className="heading-h1 text-foreground">Categories</h1>
                    </div>
                    <p className="large text-foreground/70">
                        Browse by genre - Currently showing: <span className="text-primary font-semibold">{selectedGenreName}</span>
                    </p>
                </div>

                {/* Filters */}
                <div className="space-y-6 mb-8">
                    {/* Media Type */}
                    <div data-animate="up" data-delay="0.1">
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

                    {/* Genres */}
                    <div data-animate="up" data-delay="0.2">
                        <p className="text-foreground/60 font-semibold mb-3">Select Genre:</p>
                        <div className="flex items-center gap-3 flex-wrap">
                            {genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    onClick={() => handleGenreChange(genre.id.toString())}
                                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                    selectedGenre === genre.id.toString()
                                        ? 'bg-primary text-white shadow-shadow'
                                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                    }`}
                                >
                                    {genre.name}
                                </button>
                            ))}
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
                            No Content Found
                        </h2>
                        <p className="large text-foreground/60">
                            Try selecting a different genre
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default CategoriesPage;