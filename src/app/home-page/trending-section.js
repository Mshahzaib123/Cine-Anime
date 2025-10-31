"use client";

import React, { useState, useEffect } from 'react';
import { FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import CommonCard from '@/components/common-card';
import ThemeButton from '@/components/theme-button';
import LoadingSkeleton from '@/components/loading-skeleton';
import { fetchTrending } from '@/lib/api';
import TitleViewAll from '@/components/title-view-all';

const TrendingSection = () => {
    const [trendingContent, setTrendingContent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mediaType, setMediaType] = useState('all');

    useEffect(() => {
        const loadTrending = async () => {
        setLoading(true);
            try {
                const data = await fetchTrending(mediaType, 'day');
                setTrendingContent(data.slice(0, 18));
            } catch (error) {
                console.error('Failed to load trending content:', error);
            } finally {
                setLoading(false);
            }
        };

        loadTrending();
    }, [mediaType]);

    return (
        <section className="my-28">
            <div className="container">
                <div className='flex flex-col items-start gap-6 mb-16' data-animate="up">
                    <TitleViewAll
                        TitleIcon={FiTrendingUp}
                        title="Trending Now"
                        buttonText="View All"
                        href="/trending"
                    />
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
                </div>
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
                {!loading && trendingContent.length === 0 && (
                    <div className="text-center py-12">
                        <p className="large text-foreground/60">No trending content found.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TrendingSection;