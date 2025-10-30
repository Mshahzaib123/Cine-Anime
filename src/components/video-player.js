"use client";

import React, { useEffect } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

const VideoPlayer = ({ tmdbId, mediaType, title, onClose }) => {
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

    const embedUrl = mediaType === 'movie' 
        ? `https://embed.su/embed/movie/${tmdbId}`
        : `https://embed.su/embed/tv/${tmdbId}`;

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-7xl"
                onClick={(e) => e.stopPropagation()}
            >
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

                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    />
                </div>

                <div className="mt-4 flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <FiAlertCircle className="text-yellow-500 w-5 h-5 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-white/70">
                        <p className="font-semibold text-white mb-1">Content Notice</p>
                        <p>
                            This video player uses third-party streaming services. 
                            Video availability and quality may vary.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPlayer;
