"use client";

import React, { useState, useEffect, use } from 'react';
import Image from 'next/image';
import ThemeButton from '@/components/theme-button';
import RatingStars from '@/components/rating-stars';
import Loader from '@/components/loader';
import TrailerEmbed from '@/components/trailer-embed';
import { FiPlay, FiExternalLink, FiCalendar, FiTv, FiFilm, FiPlus, FiCheck } from 'react-icons/fi';
import axios from 'axios';

const AnimeDetailsPage = ({ params }) => {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showTrailer, setShowTrailer] = useState(false);
    const [isInWatchlist, setIsInWatchlist] = useState(false);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
                setDetails(response.data.data);
                
                // Check if in watchlist
                const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
                setIsInWatchlist(watchlist.some(item => item.id === parseInt(id)));
            } catch (error) {
                console.error('Failed to load anime details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [id]);

    const toggleWatchlist = () => {
        const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
        
        if (isInWatchlist) {
            // Remove from watchlist
            const updated = watchlist.filter(item => item.id !== parseInt(id));
            localStorage.setItem('watchlist', JSON.stringify(updated));
            setIsInWatchlist(false);
        } else {
            // Add to watchlist
            const item = {
                id: parseInt(id),
                title: details.title,
                poster_path: details.images?.jpg?.image_url,
                media_type: 'anime',
                vote_average: details.score || 0,
                release_date: details.aired?.from || new Date().toISOString(),
            };
            watchlist.push(item);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            setIsInWatchlist(true);
        }
    };

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
    const trailerKey = details.trailer?.youtube_id;

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
                                        href={`/watch/${id}?type=anime`}
                                    >
                                        <FiPlay className="w-5 h-5" />
                                        Watch Now
                                    </ThemeButton>

                                    {trailerKey && (
                                        <ThemeButton
                                            size="lg"
                                            variant="outline"
                                            onClick={() => setShowTrailer(true)}
                                        >
                                            <FiFilm className="w-5 h-5" />
                                            Watch Trailer
                                        </ThemeButton>
                                    )}
                                    
                                    <ThemeButton
                                        size="lg"
                                        variant="outline"
                                        onClick={toggleWatchlist}
                                    >
                                        {isInWatchlist ? (
                                            <>
                                                <FiCheck className="w-5 h-5" />
                                                In Watchlist
                                            </>
                                        ) : (
                                            <>
                                                <FiPlus className="w-5 h-5" />
                                                Add to Watchlist
                                            </>
                                        )}
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

                                {/* Background */}
                                {details.background && (
                                    <div data-animate="up" data-delay="0.1">
                                        <h2 className="heading-h3 text-foreground mb-4">Background</h2>
                                        <p className="large text-foreground/80 leading-relaxed">
                                            {details.background}
                                        </p>
                                    </div>
                                )}

                                {/* Themes */}
                                {details.themes && details.themes.length > 0 && (
                                    <div data-animate="up" data-delay="0.2">
                                        <h2 className="heading-h3 text-foreground mb-4">Themes</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {details.themes.map((theme) => (
                                                <span
                                                    key={theme.mal_id}
                                                    className="px-4 py-2 bg-foreground/5 text-foreground rounded-full text-sm font-semibold border border-foreground/10"
                                                >
                                                    {theme.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Demographics */}
                                {details.demographics && details.demographics.length > 0 && (
                                    <div data-animate="up" data-delay="0.3">
                                        <h2 className="heading-h3 text-foreground mb-4">Demographics</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {details.demographics.map((demo) => (
                                                <span
                                                    key={demo.mal_id}
                                                    className="px-4 py-2 bg-foreground/5 text-foreground rounded-full text-sm font-semibold border border-foreground/10"
                                                >
                                                    {demo.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
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

                                        {details.aired?.string && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Aired</p>
                                                <p className="font-semibold">{details.aired.string}</p>
                                            </div>
                                        )}

                                        {details.season && details.year && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Season</p>
                                                <p className="font-semibold capitalize">{details.season} {details.year}</p>
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

                                        {details.duration && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Duration</p>
                                                <p className="font-semibold">{details.duration}</p>
                                            </div>
                                        )}

                                        {details.rating && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Rating</p>
                                                <p className="font-semibold">{details.rating}</p>
                                            </div>
                                        )}

                                        {details.score && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">MAL Score</p>
                                                <p className="font-semibold">{details.score.toFixed(2)}</p>
                                            </div>
                                        )}

                                        {details.scored_by && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Scored By</p>
                                                <p className="font-semibold">{details.scored_by.toLocaleString()} users</p>
                                            </div>
                                        )}

                                        {details.rank && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Rank</p>
                                                <p className="font-semibold">#{details.rank}</p>
                                            </div>
                                        )}

                                        {details.popularity && (
                                            <div>
                                                <p className="text-foreground/60 small mb-1">Popularity</p>
                                                <p className="font-semibold">#{details.popularity}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Producers */}
                                {details.producers && details.producers.length > 0 && (
                                    <div 
                                        className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10"
                                        data-animate="up"
                                        data-delay="0.1"
                                    >
                                        <h3 className="heading-h5 text-foreground mb-4">Producers</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {details.producers.map((producer) => (
                                                <span
                                                    key={producer.mal_id}
                                                    className="px-3 py-1 bg-foreground/10 text-foreground/80 rounded-full text-xs"
                                                >
                                                    {producer.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Licensors */}
                                {details.licensors && details.licensors.length > 0 && (
                                    <div 
                                        className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10"
                                        data-animate="up"
                                        data-delay="0.2"
                                    >
                                        <h3 className="heading-h5 text-foreground mb-4">Licensors</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {details.licensors.map((licensor) => (
                                                <span
                                                    key={licensor.mal_id}
                                                    className="px-3 py-1 bg-foreground/10 text-foreground/80 rounded-full text-xs"
                                                >
                                                    {licensor.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Trailer Modal */}
            {showTrailer && trailerKey && (
                <TrailerEmbed
                    videoKey={trailerKey}
                    onClose={() => setShowTrailer(false)}
                />
            )}
        </>
    );
};

export default AnimeDetailsPage;