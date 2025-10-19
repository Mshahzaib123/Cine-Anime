"use client";

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import ThemeButton from '@/components/theme-button';
import LoadingSkeleton from '@/components/loading-skeleton';
import { fetchTrending } from '@/lib/api';

const TrendingSection = () => {
    const [trendingContent, setTrendingContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaType, setMediaType] = useState('all'); // all, movie, tv

    useEffect(() => {
        const loadTrending = async () => {
        setLoading(true);
            try {
                const data = await fetchTrending(mediaType, 'day');
                setTrendingContent(data.slice(0, 18)); // Show only 12 items
            } catch (error) {
                console.error('Failed to load trending content:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
    }, [mediaType]);

    return (
        <section className="py-16 container">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8" data-animate="up">
                <div className="flex items-center gap-3">
                    <FiTrendingUp className="text-primary w-8 h-8" />
                    <h2 className="heading-h2 text-foreground">Trending Now</h2>
                </div>
                <ThemeButton href="/trending" variant="ghost">
                    View All
                    <FiChevronRight className="w-5 h-5" />
                </ThemeButton>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-3 mb-8">
                <ThemeButton
                    variant={mediaType === 'all' ? "fill" : "outline"}
                    onClick={() => setMediaType('all')}
                    className="cursor-pointer"
                >
                    All
                </ThemeButton>
                <ThemeButton
                    variant={mediaType === 'movie' ? "fill" : "outline"}
                    onClick={() => setMediaType('movie')}
                    className="cursor-pointer"
                >
                    Movies
                </ThemeButton>
                <ThemeButton
                    variant={mediaType === 'tv' ? "fill" : "outline"}
                    onClick={() => setMediaType('tv')}
                    className="cursor-pointer"
                >
                    TV Shows
                </ThemeButton>
            </div>

            {/* Content Grid */}
            {loading ? (
                <LoadingSkeleton count={18} />
            ) : (
                <div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    data-animate="zoom"
                    data-delay="0.2"
                >
                    {trendingContent.map((item) => (
                        <CommonCard
                            key={item.id}
                            {...item}
                            media_type={item.media_type || mediaType}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && trendingContent.length === 0 && (
                <div className="text-center py-12">
                    <p className="large text-foreground/60">No trending content found.</p>
                </div>
            )}
        </section>
    );
};

export default TrendingSection;