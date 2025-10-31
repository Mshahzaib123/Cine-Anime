"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import ThemeButton from '@/components/theme-button';
import RatingStars from '@/components/rating-stars';
import Loader from '@/components/loader';
import VideoPlayer from '@/components/video-player';
import { FiPlay, FiExternalLink, FiCalendar, FiTv } from 'react-icons/fi';
import axios from 'axios';

const AnimeDetailsPage = ({ params }) => {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
                setDetails(response.data.data);
            } catch (error) {
                console.error('Failed to load anime details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!details) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="heading-h2 text-foreground mb-4">Anime Not Found</h1>
                    <ThemeButton href="/anime">Go Back</ThemeButton>
                </div>
            </div>
        );
    }

    const imageUrl = details.images?.jpg?.large_image_url || details.images?.jpg?.image_url;
    const year = details.aired?.from ? new Date(details.aired.from).getFullYear() : 'N/A';

    return (
        <>
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={imageUrl}
                            alt={details.title}
                            fill
                            priority
                            className="object-cover blur-xl scale-110"
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>

                    <div className="container relative h-full flex items-end pb-12">
                        <div className="flex flex-col md:flex-row gap-8 w-full">
                            <div className="flex-shrink-0 w-64 hidden md:block" data-animate="up">
                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={imageUrl}
                                        alt={details.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <div className="flex-1 space-y-6" data-animate="up" data-delay="0.1">
                                <div>
                                    <h1 className="heading-h1 text-foreground mb-4">
                                        {details.title}
                                    </h1>
                                    
                                    <div className="flex flex-wrap items-center gap-4 text-foreground/80 mb-4">
                                        <RatingStars rating={details.score} size="lg" />
                                        
                                        {year && (
                                            <div className="flex items-center gap-2">
                                                <FiCalendar />
                                                <span className="font-semibold">{year}</span>
                                            </div>
                                        )}
                                        
                                        {details.episodes && (
                                            <div className="flex items-center gap-2">
                                                <FiTv />
                                                <span className="font-semibold">{details.episodes} Episodes</span>
                                            </div>
                                        )}
                                    </div>

                                    {details.genres && details.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {details.genres.map((genre) => (
                                                <span
                                                    key={genre.mal_id}
                                                    className="px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <ThemeButton
                                        size="lg"
                                        onClick={() => setShowPlayer(true)}
                                    >
                                        <FiPlay className="w-5 h-5" />
                                        Watch Now
                                    </ThemeButton>
                                    
                                    <ThemeButton
                                        size="lg"
                                        variant="outline"
                                        href={`https://myanimelist.net/anime/${id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FiExternalLink className="w-5 h-5" />
                                        View on MAL
                                    </ThemeButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="my-28">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-12">
                                <div data-animate="up">
                                    <h2 className="heading-h3 text-foreground mb-4">Synopsis</h2>
                                    <p className="large text-foreground/80 leading-relaxed">
                                        {details.synopsis || 'No synopsis available.'}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div 
                                    className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10"
                                    data-animate="up"
                                >
                                    <h3 className="heading-h5 text-foreground mb-4">Information</h3>
                                    <div className="space-y-4 text-foreground/80">
                                        {details.type && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Type</p>
                                                <p className="font-semibold">{details.type}</p>
                                            </div>
                                        )}
                                        
                                        {details.status && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Status</p>
                                                <p className="font-semibold">{details.status}</p>
                                            </div>
                                        )}
                                        
                                        {details.studios && details.studios.length > 0 && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Studio</p>
                                                <p className="font-semibold">{details.studios[0].name}</p>
                                            </div>
                                        )}

                                        {details.source && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Source</p>
                                                <p className="font-semibold">{details.source}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Video Player Modal */}
            {showPlayer && (
                <VideoPlayer
                    tmdbId={id}
                    mediaType="anime"
                    title={details.title}
                    onClose={() => setShowPlayer(false)}
                />
            )}
        </>
    );
};

export default AnimeDetailsPage;