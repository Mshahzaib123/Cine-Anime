"use client";

import React, { useState, useEffect } from 'react';
import { FiHeart, FiChevronRight } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import ThemeButton from '@/components/theme-button';
import LoadingSkeleton from '@/components/loading-skeleton';
import { fetchPopular } from '@/lib/api';

const PopularSection = () => {
    const [popularContent, setPopularContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPopular = async () => {
        setLoading(true);
        try {
            // Fetch both movies and TV shows
            const [movies, tvShows] = await Promise.all([
                fetchPopular('movie'),
                fetchPopular('tv')
            ]);
            
            // Mix movies and TV shows
            const mixed = [];
            const maxLength = Math.max(movies.length, tvShows.length);
            
            for (let i = 0; i < maxLength && mixed.length < 12; i++) {
                if (movies[i]) {
                    mixed.push({ ...movies[i], media_type: 'movie' });
                }
                if (tvShows[i] && mixed.length < 12) {
                    mixed.push({ ...tvShows[i], media_type: 'tv' });
                }
            }
            
            setPopularContent(mixed.slice(0, 12));
        } catch (error) {
            console.error('Failed to load popular content:', error);
        } finally {
            setLoading(false);
        }
        };

        loadPopular();
    }, []);

    return (
        <section className="py-16 container">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8" data-animate="up">
                <div className="flex items-center gap-3">
                    <FiHeart className="text-primary w-8 h-8" />
                    <h2 className="heading-h2 text-foreground">Popular This Week</h2>
                </div>
                <ThemeButton href="/categories" variant="ghost">
                    Explore More
                    <FiChevronRight className="w-5 h-5" />
                </ThemeButton>
            </div>

            {/* Content Grid */}
            {loading ? (
                <LoadingSkeleton count={12} />
            ) : (
                <div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                    data-animate="zoom"
                    data-delay="0.2"
                >
                    {popularContent.map((item) => (
                        <CommonCard
                        key={`${item.media_type}-${item.id}`}
                        {...item}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && popularContent.length === 0 && (
                <div className="text-center py-12">
                    <p className="large text-foreground/60">No popular content found.</p>
                </div>
            )}
        </section>
    );
};

export default PopularSection;