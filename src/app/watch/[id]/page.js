"use client";

import React, { useState, useEffect, use, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FiPlay, FiChevronDown, FiCalendar, FiClock, FiStar } from 'react-icons/fi';
import axios from 'axios';
import Loader from '@/components/loader';
import VideoPlayer from '@/components/video-player';
import ThemeButton from '@/components/theme-button';
import { getImageUrl } from '@/lib/api';

const WatchPage = ({ params }) => {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const searchParams = useSearchParams();
    const mediaType = searchParams.get('type') || 'tv';
    
    const [details, setDetails] = useState(null);
    const [seasons, setSeasons] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false);

    // Fetch content details
    useEffect(() => {
        const loadDetails = async () => {
            try {
                if (mediaType === "anime") {
                    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
                    const animeData = response.data.data;
                    setDetails(animeData);
                    if (animeData.episodes) {
                    const episodesList = Array.from({ length: animeData.episodes }, (_, i) => ({
                        episode_number: i + 1,
                        name: `Episode ${i + 1}`,
                        overview: "",
                        still_path: animeData.images?.jpg?.large_image_url,
                    }));
                    setEpisodes(episodesList);
                    }
                } else {
                    const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${id}`,
                    {
                        params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                        append_to_response: "credits,videos",
                        },
                    }
                    );
                    setDetails(response.data);
                    setSeasons(response.data.seasons || []);

                    if (response.data.seasons?.length > 0) {
                    const firstSeason = response.data.seasons.find(s => s.season_number > 0);
                    if (firstSeason) {
                        setSelectedSeason(firstSeason.season_number);
                        loadEpisodes(firstSeason.season_number);
                    }
                    }
                }
            } catch (error) {
                console.error("Failed to load details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [id, mediaType, loadEpisodes]);

    // Load episodes for selected season
    const loadEpisodes = useCallback(async (seasonNumber) => {
        if (mediaType === 'anime') return;
        
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}`,
                {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                    },
                }
            );
            setEpisodes(response.data.episodes || []);
        } catch (error) {
            console.error('Failed to load episodes:', error);
            setEpisodes([]);
        }
    }, [id, mediaType]);

    const handleSeasonChange = (seasonNumber) => {
        setSelectedSeason(seasonNumber);
        loadEpisodes(seasonNumber);
    };

    const handlePlayEpisode = (episode) => {
        setSelectedEpisode(episode);
        setShowPlayer(true);
    };

    if (loading) {
        return <Loader />;
    }

    if (!details) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="heading-h2 text-foreground mb-4">Content Not Found</h1>
                    <ThemeButton href="/">Go Back Home</ThemeButton>
                </div>
            </div>
        );
    }

    const title = details.title || details.name;
    const backdropUrl = mediaType === 'anime' 
        ? details.images?.jpg?.large_image_url 
        : getImageUrl(details.backdrop_path);

    return (
        <>
            <main className="min-h-screen pb-16">
                {/* Header with backdrop */}
                <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
                    <div className="absolute inset-0">
                        <Image
                            src={backdropUrl}
                            alt={title}
                            fill
                            priority
                            className="object-cover blur-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                    </div>

                    <div className="container relative h-full flex items-end pb-8">
                        <div data-animate="up">
                            <h1 className="heading-h1 text-foreground mb-2">{title}</h1>
                            <p className="large text-foreground/70">
                                {mediaType === 'anime' 
                                    ? `${episodes.length} Episodes`
                                    : `${seasons.filter(s => s.season_number > 0).length} Seasons • ${details.number_of_episodes} Episodes`
                                }
                            </p>
                        </div>
                    </div>
                </section>

                <div className="container mt-8">
                    {/* Season Selector for TV Shows */}
                    {mediaType !== 'anime' && seasons.length > 0 && (
                        <div className="mb-8" data-animate="up" data-delay="0.1">
                            <div className="relative inline-block">
                                <select
                                    value={selectedSeason}
                                    onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
                                    className="appearance-none bg-foreground/5 border border-foreground/10 rounded-2xl px-6 py-3 pr-12 text-foreground font-semibold cursor-pointer hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {seasons
                                        .filter(season => season.season_number > 0)
                                        .map((season) => (
                                            <option key={season.id} value={season.season_number}>
                                                {season.name} ({season.episode_count} episodes)
                                            </option>
                                        ))}
                                </select>
                                <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* Episodes Grid */}
                    <div className="space-y-4" data-animate="up" data-delay="0.2">
                        <h2 className="heading-h3 text-foreground mb-6">
                            {mediaType === 'anime' ? 'Episodes' : `Season ${selectedSeason} Episodes`}
                        </h2>

                        {episodes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {episodes.map((episode) => (
                                    <div
                                        key={episode.episode_number}
                                        className="group relative bg-foreground/5 rounded-2xl overflow-hidden border border-foreground/10 hover:shadow-shadow transition-all duration-300"
                                    >
                                        <div className="flex gap-4 p-4">
                                            {/* Episode Thumbnail */}
                                            <div className="relative flex-shrink-0 w-40 aspect-video rounded-xl overflow-hidden bg-foreground/10">
                                                {episode.still_path ? (
                                                    <Image
                                                        src={mediaType === 'anime' 
                                                            ? episode.still_path 
                                                            : getImageUrl(episode.still_path, '/w300')
                                                        }
                                                        alt={episode.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="text-4xl font-bold text-foreground/30">
                                                            {episode.episode_number}
                                                        </span>
                                                    </div>
                                                )}
                                                
                                                {/* Play Button Overlay */}
                                                <button
                                                    onClick={() => handlePlayEpisode(episode)}
                                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                                                >
                                                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                                                        <FiPlay className="w-6 h-6 text-white ml-1" />
                                                    </div>
                                                </button>
                                            </div>

                                            {/* Episode Info */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                        {episode.episode_number}. {episode.name}
                                                    </h3>
                                                </div>

                                                {/* Episode Meta */}
                                                <div className="flex items-center gap-3 text-foreground/60 text-sm mb-2">
                                                    {episode.runtime && (
                                                        <div className="flex items-center gap-1">
                                                            <FiClock className="w-4 h-4" />
                                                            <span>{episode.runtime}m</span>
                                                        </div>
                                                    )}
                                                    {episode.air_date && (
                                                        <div className="flex items-center gap-1">
                                                            <FiCalendar className="w-4 h-4" />
                                                            <span>{new Date(episode.air_date).toLocaleDateString()}</span>
                                                        </div>
                                                    )}
                                                    {episode.vote_average > 0 && (
                                                        <div className="flex items-center gap-1">
                                                            <FiStar className="w-4 h-4 text-yellow-400" />
                                                            <span>{episode.vote_average.toFixed(1)}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Episode Overview */}
                                                {episode.overview && (
                                                    <p className="text-foreground/70 text-sm line-clamp-2">
                                                        {episode.overview}
                                                    </p>
                                                )}

                                                {/* Play Button (Mobile) */}
                                                <button
                                                    onClick={() => handlePlayEpisode(episode)}
                                                    className="mt-3 md:hidden flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full font-semibold hover:shadow-shadow transition-all"
                                                >
                                                    <FiPlay className="w-4 h-4" />
                                                    Play
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24">
                                <p className="large text-foreground/60">
                                    No episodes available for this season
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Video Player Modal */}
            {showPlayer && selectedEpisode && (
                <VideoPlayer
                    tmdbId={id}
                    mediaType={mediaType}
                    title={`${title} - ${selectedEpisode.name}`}
                    season={mediaType !== 'anime' ? selectedSeason : undefined}
                    episode={selectedEpisode.episode_number}
                    onClose={() => {
                        setShowPlayer(false);
                        setSelectedEpisode(null);
                    }}
                />
            )}
        </>
    );
};

export default WatchPage;