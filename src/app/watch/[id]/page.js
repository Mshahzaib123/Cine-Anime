"use client";

import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { FiPlay, FiChevronDown, FiCalendar, FiClock, FiStar, FiFilm } from 'react-icons/fi';
import axios from 'axios';
import Loader from '@/components/loader';
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
    const [showingTrailer, setShowingTrailer] = useState(true);
    const [trailerKey, setTrailerKey] = useState(null);

    // Fetch content details
    useEffect(() => {
        // Load episodes for selected season
        const loadEpisodes = async (seasonNumber) => {
            if (mediaType === 'anime' || mediaType === 'movie') return;
            
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
        };
        const loadDetails = async () => {
            try {
                if (mediaType === "anime") {
                    const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
                    const animeData = response.data.data;
                    setDetails(animeData);
                    
                    // Get trailer if available
                    if (animeData.trailer?.youtube_id) {
                        setTrailerKey(animeData.trailer.youtube_id);
                    }
                    
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
                        `https://api.themoviedb.org/3/${mediaType}/${id}`,
                        {
                            params: {
                                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                                append_to_response: "credits,videos",
                            },
                        }
                    );
                    setDetails(response.data);
                    setSeasons(response.data.seasons || []);

                    // Get trailer
                    const trailer = response.data.videos?.results?.find(
                        video => video.type === 'Trailer' && video.site === 'YouTube'
                    );
                    if (trailer) {
                        setTrailerKey(trailer.key);
                    }

                    if (mediaType === 'tv' && response.data.seasons?.length > 0) {
                        const firstSeason = response.data.seasons.find(s => s.season_number > 0);
                        if (firstSeason) {
                            setSelectedSeason(firstSeason.season_number);
                            loadEpisodes(firstSeason.season_number);
                        }
                    } else if (mediaType === 'movie') {
                        // For movies, show trailer by default
                        setShowingTrailer(true);
                    }
                }
            } catch (error) {
                console.error("Failed to load details:", error);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [id, mediaType]);

    const handleSeasonChange = (seasonNumber) => {
        setSelectedSeason(seasonNumber);
        loadEpisodes(seasonNumber);
        setShowingTrailer(true); // Reset to trailer when changing season
        setSelectedEpisode(null);
    };

    const handlePlayEpisode = (episode) => {
        setSelectedEpisode(episode);
        setShowingTrailer(false);
    };

    const handleShowTrailer = () => {
        setShowingTrailer(true);
        setSelectedEpisode(null);
    };

    // Get embed URL based on what's selected
    const getEmbedUrl = () => {
        if (showingTrailer && trailerKey) {
            return `https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`;
        }

        if (mediaType === 'anime' && selectedEpisode) {
            return `https://vidsrc.xyz/embed/anime/${id}/${selectedEpisode.episode_number}`;
        }

        if (mediaType === 'movie') {
            return `https://vidsrc.to/embed/movie/${id}`;
        }

        if (mediaType === 'tv' && selectedEpisode) {
            return `https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode.episode_number}`;
        }

        return null;
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
    const embedUrl = getEmbedUrl();

    return (
        <main className="min-h-screen pb-16">
            <div className="container max-w-7xl">
                {/* Video Player Section */}
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden my-8" data-animate="up">
                    {embedUrl ? (
                        <iframe
                            key={embedUrl}
                            src={embedUrl}
                            className="w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            referrerPolicy="origin"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">
                            <div className="text-center">
                                <FiFilm className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p>Select an episode to start watching</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Title and Controls */}
                <div className="mb-8" data-animate="up" data-delay="0.1">
                    <h1 className="heading-h2 text-foreground mb-2">{title}</h1>
                    {selectedEpisode ? (
                        <p className="large text-foreground/70">
                            {mediaType === 'tv' && `Season ${selectedSeason} • `}
                            Episode {selectedEpisode.episode_number}: {selectedEpisode.name}
                        </p>
                    ) : showingTrailer ? (
                        <p className="large text-foreground/70">Official Trailer</p>
                    ) : (
                        <p className="large text-foreground/70">
                            {mediaType === 'anime' 
                                ? `${episodes.length} Episodes`
                                : mediaType === 'movie'
                                ? 'Feature Film'
                                : `${seasons.filter(s => s.season_number > 0).length} Seasons • ${details.number_of_episodes} Episodes`
                            }
                        </p>
                    )}
                </div>

                {/* Controls Row */}
                <div className="flex items-center gap-4 mb-8 flex-wrap" data-animate="up" data-delay="0.2">
                    {/* Trailer Button */}
                    {trailerKey && (
                        <ThemeButton
                            onClick={handleShowTrailer}
                            variant={showingTrailer ? "fill" : "outline"}
                        >
                            <FiFilm className="w-5 h-5" />
                            Trailer
                        </ThemeButton>
                    )}

                    {/* Season Selector for TV Shows */}
                    {mediaType === 'tv' && seasons.length > 0 && (
                        <div className="relative">
                            <select
                                value={selectedSeason}
                                onChange={(e) => handleSeasonChange(parseInt(e.target.value))}
                                className="appearance-none bg-foreground/5 border border-foreground/10 rounded-full px-6 py-3 pr-12 text-foreground font-semibold cursor-pointer hover:bg-foreground/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                {seasons
                                    .filter(season => season.season_number > 0)
                                    .map((season) => (
                                        <option key={season.id} value={season.season_number}>
                                            {season.name} ({season.episode_count} eps)
                                        </option>
                                    ))}
                            </select>
                            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/60 pointer-events-none" />
                        </div>
                    )}
                </div>

                {/* Episodes Grid - Only show for TV shows and anime */}
                {(mediaType === 'tv' || mediaType === 'anime') && episodes.length > 0 && (
                    <div className="space-y-4" data-animate="up" data-delay="0.3">
                        <h2 className="heading-h3 text-foreground">
                            {mediaType === 'anime' ? 'Episodes' : `Season ${selectedSeason} Episodes`}
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {episodes.map((episode) => (
                                <button
                                    key={episode.episode_number}
                                    onClick={() => handlePlayEpisode(episode)}
                                    className={`group relative bg-foreground/5 rounded-2xl overflow-hidden border transition-all duration-300 text-left ${
                                        selectedEpisode?.episode_number === episode.episode_number
                                            ? 'border-primary shadow-shadow'
                                            : 'border-foreground/10 hover:border-primary/50 hover:shadow-shadow'
                                    }`}
                                >
                                    <div className="flex gap-4 p-4">
                                        {/* Episode Thumbnail */}
                                        <div className="relative flex-shrink-0 w-32 aspect-video rounded-xl overflow-hidden bg-foreground/10">
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
                                                    <span className="text-3xl font-bold text-foreground/30">
                                                        {episode.episode_number}
                                                    </span>
                                                </div>
                                            )}
                                            
                                            {/* Play Button Overlay */}
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                                    <FiPlay className="w-5 h-5 text-white ml-0.5" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Episode Info */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                {episode.episode_number}. {episode.name}
                                            </h3>

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
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Movie Info - Show overview and details */}
                {mediaType === 'movie' && (
                    <div className="mt-8" data-animate="up" data-delay="0.3">
                        <h2 className="heading-h3 text-foreground mb-4">Overview</h2>
                        <p className="large text-foreground/80 leading-relaxed">
                            {details.overview || 'No overview available.'}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default WatchPage;