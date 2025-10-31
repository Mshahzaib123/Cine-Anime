"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiPlus, FiInfo } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import { fetchTrending, getImageUrl, BACKDROP_SIZE } from '@/lib/api';
import Loader from '@/components/loader';
import clsx from 'clsx';
import { FaPlay, FaStar } from 'react-icons/fa';

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
        <section className="relative overflow-hidden">
            <div className="relative aspect-21/9">
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
            <div className='absolute top-1/2 left-0 -translate-y-1/2 max-h-full h-[350px] w-full'>
                <div className="container h-full">
                    <div className="flex flex-col justify-between w-full h-full" data-animate="up" data-up-from="60">
                        <div className='flex flex-col'>
                            <h1 className="heading-h1 text-foreground drop-shadow-lg">
                                {title}
                            </h1>
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex items-center gap-2 bg-foreground/10 backdrop-blur-sm px-3 py-1 rounded-full">
                                    <FaStar size={20} className="text-primary" />
                                    <span className="font-bold base">{rating}</span>
                                </div>
                                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full backdrop-blur-sm">
                                    <span className="font-bold base capitalize">{featuredContent.media_type || 'movie'}</span>
                                </span>
                                {year && (
                                    <span className="base font-semibold">{year}</span>
                                )}
                            </div>
                            <p className="large text-foreground/90 line-clamp-3 max-w-3xl">
                                {featuredContent.overview || 'No description available.'}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <ThemeButton 
                                href={`/details/${featuredContent.id}?type=${featuredContent.media_type || 'movie'}`}
                                size="lg"
                                variant="fill"
                            >
                                <FaPlay size={20} />
                                Watch Now
                            </ThemeButton>
                            <ThemeButton 
                                href={`/details/${featuredContent.id}?type=${featuredContent.media_type || 'movie'}`}
                                size="lg"
                                variant="outline"
                            >
                                <FiInfo size={20} />
                                More Info
                            </ThemeButton>
                            <ThemeButton 
                                size="lg"
                                variant="ghost"
                            >
                                <FiPlus size={20} />
                                Watchlist
                            </ThemeButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
                {allContent.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setCurrentIndex(index);
                            setFeaturedContent(allContent[index]);
                        }}
                        className={clsx(
                            "h-2 rounded-full transition-all duration-300 cursor-pointer",
                            index === currentIndex 
                                ? 'w-10 bg-primary' 
                                : 'w-6 bg-foreground/20 hover:bg-foreground/50'
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;