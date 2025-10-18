"use client";

import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '@/lib/api';
import RatingStars from '@/components/rating-stars';

const WatchlistCard = ({ item, onRemove }) => {
    const imageUrl = getImageUrl(item.poster_path);
    const year = item.release_date 
        ? new Date(item.release_date).getFullYear() 
        : 'N/A';

    return (
        <div className="group relative">
            <Link 
                href={`/details/${item.id}?type=${item.media_type}`}
                className="block"
            >
                <div className="relative overflow-hidden rounded-2xl bg-foreground/5 transition-all duration-300 hover:scale-105 hover:shadow-shadow">
                    <div className="relative aspect-[2/3] overflow-hidden">
                        <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    
                    <div className="p-4">
                        <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                            {item.title}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                            <span className="text-foreground/60 text-sm">{year}</span>
                            {item.vote_average > 0 && (
                                <RatingStars rating={item.vote_average} size="sm" showNumber={false} />
                            )}
                        </div>
                    </div>
                </div>
            </Link>

            {/* Remove Button */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    onRemove(item.id);
                }}
                className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
                aria-label="Remove from watchlist"
            >
                <FiTrash2 className="w-4 h-4" />
            </button>
        </div>
    );
}

export default WatchlistCard;