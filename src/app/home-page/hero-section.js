"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiPlay, FiPlus, FiInfo, FiStar } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import { fetchTrending, getImageUrl, BACKDROP_SIZE } from '@/lib/api';
import Loader from '@/components/loader';

const HeroSection = () => {
    const [featuredContent, setFeaturedContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [allContent, setAllContent] = useState([]);

    useEffect(() => {
        const loadTrending = async () => {
            try {
                const data = await fetchTrending('all', 'week');
                const topItems = data.slice(0, 5);
                setAllContent(topItems);
                setFeaturedContent(topItems[0]);
                setLoading(false);
            } catch (error) {
                console.error('Failed to load hero content:', error);
                setLoading(false);
            }
        };

        loadTrending();
    }, []);

    // Auto-rotate featured content every 5 seconds
    useEffect(() => {
        if (allContent.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => {
                    const next = (prev + 1) % allContent.length;
                    setFeaturedContent(allContent[next]);
                    return next;
                });
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [allContent]);

    if (loading) {
        return <Loader />;
    }

    if (!featuredContent) {
        return null;
    }

    const title = featuredContent.title || featuredContent.name;
    const releaseDate = featuredContent.release_date || featuredContent.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : '';
    const rating = featuredContent.vote_average?.toFixed(1) || 'N/A';
    const backdropUrl = getImageUrl(featuredContent.backdrop_path, BACKDROP_SIZE);

    return (
        <section className="relative h-[90vh] min-h-[600px] overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={backdropUrl}
                    alt={title}
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <div className="container relative h-full flex items-center">
                <div className="max-w-2xl space-y-6" data-animate="up" data-up-from="60">
                    <h1 className="heading-h1 text-foreground drop-shadow-lg">
                        {title}
                    </h1>
                    <div className="flex items-center gap-4 text-foreground/80">
                        <div className="flex items-center gap-2 bg-foreground/10 backdrop-blur-sm px-3 py-1 rounded-full">
                            <FiStar className="text-yellow-400" />
                            <span className="font-bold">{rating}</span>
                        </div>
                        {year && (
                            <span className="font-semibold">{year}</span>
                        )}
                        <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-bold uppercase">
                            {featuredContent.media_type || 'movie'}
                        </span>
                    </div>
                    <p className="large text-foreground/90 line-clamp-3 drop-shadow-md">
                        {featuredContent.overview || 'No description available.'}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <ThemeButton 
                            href={`/details/${featuredContent.id}?type=${featuredContent.media_type || 'movie'}`}
                            size="lg"
                            variant="fill"
                        >
                            <FiPlay className="w-5 h-5" />
                            Watch Now
                        </ThemeButton>
                        <ThemeButton 
                            href={`/details/${featuredContent.id}?type=${featuredContent.media_type || 'movie'}`}
                            size="lg"
                            variant="outline"
                        >
                        <FiInfo className="w-5 h-5" />
                            More Info
                        </ThemeButton>

                        <ThemeButton 
                            size="lg"
                            variant="ghost"
                        >
                            <FiPlus className="w-5 h-5" />
                            Watchlist
                        </ThemeButton>
                    </div>
                    <div className="flex items-center gap-2">
                        {allContent.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setFeaturedContent(allContent[index]);
                                }}
                                className={`h-1 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? 'w-8 bg-primary' 
                                    : 'w-4 bg-foreground/30 hover:bg-foreground/50'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;