"use client";

import React, { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ThemeButton from '@/components/theme-button';
import RatingStars from '@/components/rating-stars';
import CastCrewList from '@/components/cast-crew-list';
import CommonCard from '@/components/common-card';
import TrailerEmbed from '@/components/trailer-embed';
import Loader from '@/components/loader';
import VideoPlayer from '@/components/video-player';
import { fetchDetails, getImageUrl, BACKDROP_SIZE } from '@/lib/api';
import { 
    FiPlay, 
    FiPlus, 
    FiCheck,
    FiCalendar, 
    FiClock,
    FiGlobe,
    FiFilm
} from 'react-icons/fi';

const DetailsPage = ({ params }) => {
    const unwrappedParams = use(params);
    const { id } = unwrappedParams;
    const searchParams = useSearchParams();
    const mediaType = searchParams.get('type') || 'movie';
    
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [showTrailer, setShowTrailer] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await fetchDetails(id, mediaType);
                setDetails(data);
                
                // Check if in watchlist
                const watchlist = JSON.parse(localStorage.getItem('watchlist') || '[]');
                setIsInWatchlist(watchlist.some(item => item.id === parseInt(id)));
            } catch (error) {
                console.error('Failed to load details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDetails();
    }, [id, mediaType]);

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
                id: details.id,
                title: details.title || details.name,
                poster_path: details.poster_path,
                media_type: mediaType,
                vote_average: details.vote_average,
                release_date: details.release_date || details.first_air_date,
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
                    <h1 className="heading-h2 text-foreground mb-4">Content Not Found</h1>
                    <ThemeButton href="/">Go Back Home</ThemeButton>
                </div>
            </div>
        );
    }

    const title = details.title || details.name;
    const releaseDate = details.release_date || details.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const runtime = details.runtime || details.episode_run_time?.[0];
    const backdropUrl = getImageUrl(details.backdrop_path, BACKDROP_SIZE);
    const posterUrl = getImageUrl(details.poster_path);
    
    // Get trailer
    const trailer = details.videos?.results?.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
    );

    return (
        <>
            <main className="min-h-screen">
                {/* Hero Section with Backdrop */}
                <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <Image
                            src={backdropUrl}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                            quality={90}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="container relative h-full flex items-end pb-12">
                        <div className="flex flex-col md:flex-row gap-8 w-full">
                            {/* Poster */}
                            <div 
                                className="flex-shrink-0 w-64 hidden md:block"
                                data-animate="up"
                            >
                                <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={posterUrl}
                                        alt={title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 space-y-6" data-animate="up" data-delay="0.1">
                                <div>
                                    <h1 className="heading-h1 text-foreground mb-4">
                                        {title}
                                    </h1>
                                    
                                    {/* Meta Info */}
                                    <div className="flex flex-wrap items-center gap-4 text-foreground/80 mb-4">
                                        <RatingStars rating={details.vote_average} size="lg" />
                                        
                                        {year && (
                                            <div className="flex items-center gap-2">
                                                <FiCalendar />
                                                <span className="font-semibold">{year}</span>
                                            </div>
                                        )}
                                        
                                        {runtime && (
                                            <div className="flex items-center gap-2">
                                                <FiClock />
                                                <span className="font-semibold">{runtime} min</span>
                                            </div>
                                        )}

                                        {details.original_language && (
                                            <div className="flex items-center gap-2">
                                                <FiGlobe />
                                                <span className="font-semibold uppercase">
                                                    {details.original_language}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Genres */}
                                    {details.genres && details.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {details.genres.map((genre) => (
                                                <span
                                                    key={genre.id}
                                                    className="px-4 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Tagline */}
                                {details.tagline && (
                                    <p className="large italic text-foreground/70">
                                        {details.tagline}
                                    </p>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <ThemeButton
                                        size="lg"
                                        onClick={() => setShowPlayer(true)}
                                    >
                                        <FiPlay className="w-5 h-5" />
                                        Watch Now
                                    </ThemeButton>

                                    {trailer && (
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
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Details Section */}
                <section className="py-16 container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <div data-animate="up">
                                <h2 className="heading-h3 text-foreground mb-4">Overview</h2>
                                <p className="large text-foreground/80 leading-relaxed">
                                    {details.overview || 'No overview available.'}
                                </p>
                            </div>

                            {/* Cast & Crew */}
                            {details.credits && (
                                <div data-animate="up" data-delay="0.1">
                                    <CastCrewList credits={details.credits} />
                                </div>
                            )}

                            {/* Similar Content */}
                            {details.similar?.results && details.similar.results.length > 0 && (
                                <div data-animate="up" data-delay="0.2">
                                    <h2 className="heading-h3 text-foreground mb-6">
                                        More Like This
                                    </h2>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                        {details.similar.results.slice(0, 8).map((item) => (
                                            <CommonCard
                                                key={item.id}
                                                {...item}
                                                media_type={mediaType}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Additional Info */}
                            <div 
                                className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10"
                                data-animate="up"
                                data-delay="0.3"
                            >
                                <h3 className="heading-h5 text-foreground mb-4">Information</h3>
                                <div className="space-y-4 text-foreground/80">
                                    {details.status && (
                                        <div>
                                            <p className="text-foreground/60 small mb-1">Status</p>
                                            <p className="font-semibold">{details.status}</p>
                                        </div>
                                    )}
                                    
                                    {details.budget > 0 && (
                                        <div>
                                            <p className="text-foreground/60 small mb-1">Budget</p>
                                            <p className="font-semibold">
                                                ${details.budget.toLocaleString()}
                                            </p>
                                        </div>
                                    )}
                                    
                                    {details.revenue > 0 && (
                                        <div>
                                            <p className="text-foreground/60 small mb-1">Revenue</p>
                                            <p className="font-semibold">
                                                ${details.revenue.toLocaleString()}
                                            </p>
                                        </div>
                                    )}

                                    {details.number_of_seasons && (
                                        <div>
                                            <p className="text-foreground/60 small mb-1">Seasons</p>
                                            <p className="font-semibold">{details.number_of_seasons}</p>
                                        </div>
                                    )}

                                    {details.number_of_episodes && (
                                        <div>
                                            <p className="text-foreground/60 small mb-1">Episodes</p>
                                            <p className="font-semibold">{details.number_of_episodes}</p>
                                        </div>
                                    )}

                                    {details.production_companies && details.production_companies.length > 0 && (
                                        <div>
                                            <p className="text-foreground/60 small mb-1">Production</p>
                                            <p className="font-semibold">
                                                {details.production_companies[0].name}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Homepage Link */}
                            {details.homepage && (
                                <ThemeButton
                                    href={details.homepage}
                                    variant="outline"
                                    className="w-full"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FiGlobe className="w-5 h-5" />
                                    Official Website
                                </ThemeButton>
                            )}
                        </div>
                    </div>
                </section>
            </main>

            {/* Trailer Modal */}
            {showTrailer && trailer && (
                <TrailerEmbed
                    videoKey={trailer.key}
                    onClose={() => setShowTrailer(false)}
                />
            )}

            {/* Video Player Modal */}
            {showPlayer && (
                <VideoPlayer
                    tmdbId={id}
                    mediaType={mediaType}
                    title={title}
                    onClose={() => setShowPlayer(false)}
                />
            )}
        </>
    );
};

export default DetailsPage;