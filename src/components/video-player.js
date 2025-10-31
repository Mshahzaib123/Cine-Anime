"use client";

import React, { useEffect, useState } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

const VideoPlayer = ({ tmdbId, mediaType, title, onClose }) => {
    const [embedProvider, setEmbedProvider] = useState('vidsrc'); // vidsrc, vidsrcpro, 2embed

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    // Multiple embed provider options
    const getEmbedUrl = () => {
        switch (embedProvider) {
            case 'vidsrc':
                // VidSrc.to - Most reliable
                return mediaType === 'movie'
                    ? `https://vidsrc.to/embed/movie/${tmdbId}`
                    : `https://vidsrc.to/embed/tv/${tmdbId}`;
            
            case 'vidsrcpro':
                // VidSrc.pro - Alternative
                return mediaType === 'movie'
                    ? `https://vidsrc.pro/embed/movie/${tmdbId}`
                    : `https://vidsrc.pro/embed/tv/${tmdbId}`;
            
            case '2embed':
                // 2embed
                return mediaType === 'movie'
                    ? `https://www.2embed.cc/embed/${tmdbId}`
                    : `https://www.2embed.cc/embedtv/${tmdbId}`;
            
            case 'embedsu':
                // Embed.su (original - may not work)
                return mediaType === 'movie'
                    ? `https://embed.su/embed/movie/${tmdbId}`
                    : `https://embed.su/embed/tv/${tmdbId}`;
            
            default:
                return mediaType === 'movie'
                    ? `https://vidsrc.to/embed/movie/${tmdbId}`
                    : `https://vidsrc.to/embed/tv/${tmdbId}`;
        }
    };

    const embedUrl = getEmbedUrl();

    const providers = [
        { id: 'vidsrc', name: 'VidSrc' },
        { id: 'vidsrcpro', name: 'VidSrc Pro' },
        { id: '2embed', name: '2Embed' },
        { id: 'embedsu', name: 'Embed.su' },
    ];

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-7xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-white text-xl font-bold">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors duration-200"
                        aria-label="Close player"
                    >
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                {/* Provider Selector */}
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-white/70 text-sm">Player:</span>
                    <div className="flex gap-2">
                        {providers.map((provider) => (
                            <button
                                key={provider.id}
                                onClick={() => setEmbedProvider(provider.id)}
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                                    embedProvider === provider.id
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                }`}
                            >
                                {provider.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
                    <iframe
                        key={embedUrl} // Force reload when provider changes
                        src={embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        referrerPolicy="origin"
                    />
                </div>

                {/* Disclaimer */}
                <div className="mt-4 flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <FiAlertCircle className="text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white/70">
                        <p className="font-semibold text-white mb-1">Content Notice</p>
                        <p>
                            This video player uses third-party streaming services. If one player does not work, try switching to another provider above. Video availability and quality may vary.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;