"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FiSearch, FiFilter } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import LoadingSkeleton from '@/components/loading-skeleton';
import Pagination from '@/components/pagination';
import Footer from '@/components/footer';
import { searchContent } from '@/lib/api';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || '';
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [mediaFilter, setMediaFilter] = useState('all'); // all, movie, tv, person

    useEffect(() => {
        if (query) {
            loadResults(currentPage);
        }
    }, [query, currentPage, mediaFilter]);

    const loadResults = async (page) => {
        setLoading(true);
            try {
            const data = await searchContent(query, page);
            
            // Filter by media type if needed
            let filtered = data.results;
            if (mediaFilter !== 'all') {
                filtered = filtered.filter(item => item.media_type === mediaFilter);
            }
            
            setResults(filtered);
            setTotalPages(data.total_pages);
            setTotalResults(data.total_results);
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleFilterChange = (filter) => {
        setMediaFilter(filter);
        setCurrentPage(1);
    };

    return (
        <>
            <main className="min-h-screen py-16">
                <div className="container">
                    {/* Header */}
                    <div className="mb-12" data-animate="up">
                        <div className="flex items-center gap-3 mb-2">
                            <FiSearch className="text-primary w-10 h-10" />
                            <h1 className="heading-h1 text-foreground">Search Results</h1>
                        </div>
                        <p className="large text-foreground/70">
                            {query ? (
                                <>
                                    Showing results for <span className="text-primary font-semibold">"{query}"</span>
                                    {totalResults > 0 && (
                                        <span className="text-foreground/60"> - {totalResults} results found</span>
                                    )}
                                </>
                            ) : (
                                'Enter a search query to find movies, TV shows, and more'
                            )}
                        </p>
                    </div>

                    {query && (
                        <>
                            {/* Filters */}
                            <div 
                                className="flex items-center gap-3 mb-8 flex-wrap"
                                data-animate="up"
                                data-delay="0.1"
                            >
                                <div className="flex items-center gap-2">
                                    <FiFilter className="text-foreground/60" />
                                    <span className="text-foreground/60 font-semibold">Filter:</span>
                                </div>
                                
                                <button
                                    onClick={() => handleFilterChange('all')}
                                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                        mediaFilter === 'all'
                                        ? 'bg-primary text-white shadow-shadow'
                                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                    }`}
                                >
                                    All
                                </button>
                                
                                <button
                                    onClick={() => handleFilterChange('movie')}
                                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                        mediaFilter === 'movie'
                                        ? 'bg-primary text-white shadow-shadow'
                                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                    }`}
                                >
                                    Movies
                                </button>
                                
                                <button
                                    onClick={() => handleFilterChange('tv')}
                                    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                                        mediaFilter === 'tv'
                                        ? 'bg-primary text-white shadow-shadow'
                                        : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10'
                                    }`}
                                >
                                    TV Shows
                                </button>
                            </div>

                            {/* Results Grid */}
                            {loading ? (
                                <LoadingSkeleton count={18} />
                            ) : results.length > 0 ? (
                                <>
                                    <div 
                                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12"
                                        data-animate="zoom"
                                        data-delay="0.2"
                                    >
                                        {results
                                        .filter(item => item.media_type !== 'person')
                                        .map((item) => (
                                            <CommonCard
                                                key={`${item.media_type}-${item.id}`}
                                                {...item}
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
                                <div 
                                    className="text-center py-24"
                                    data-animate="up"
                                    data-delay="0.2"
                                >
                                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-foreground/5 mb-6">
                                        <FiSearch className="w-12 h-12 text-foreground/30" />
                                    </div>
                                    <h2 className="heading-h3 text-foreground mb-4">
                                        No Results Found
                                    </h2>
                                    <p className="large text-foreground/60">
                                        Try adjusting your search or filters
                                    </p>
                                </div>
                            )}
                        </>
                    )}

                    {/* Empty State - No Query */}
                    {!query && (
                        <div 
                            className="text-center py-24"
                            data-animate="up"
                        >
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                                <FiSearch className="w-12 h-12 text-primary" />
                            </div>
                            <h2 className="heading-h3 text-foreground mb-4">
                                Start Your Search
                            </h2>
                            <p className="large text-foreground/60 max-w-md mx-auto">
                                Use the search bar above to find your favorite movies, TV shows, and more
                            </p>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default SearchPage;