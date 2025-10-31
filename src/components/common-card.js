"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import { getImageUrl } from '@/lib/api';
import { FaStar } from 'react-icons/fa';

const CommonCard = ({ 
    id, 
    title, 
    name, 
    poster_path, 
    vote_average, 
    release_date, 
    first_air_date,
    media_type = 'movie',
    overview
}) => {
    const displayTitle = title || name;
    const releaseDate = release_date || first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : 'N/A';
    const rating = vote_average ? vote_average.toFixed(1) : 'N/A';
    const imageUrl = getImageUrl(poster_path);

    return (
        <Link 
            href={`/details/${id}?type=${media_type}`}
            className="group block overflow-hidden rounded-2xl"
        >
            <div className="flex flex-col bg-foreground/5 transition-all duration-300 hover:shadow-shadow">
                <div className="relative aspect-[2/3] overflow-hidden rounded-2xl">
                    <Image
                        src={imageUrl}
                        alt={displayTitle}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {vote_average > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-white px-2 py-1 rounded-full">
                            <FaStar size={16} className="text-primary" />
                            <span className="text-black base font-bold">{rating}</span>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white small line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {overview || 'No description available.'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-4">
                    <h3 title={displayTitle} className="base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors duration-300">
                        {displayTitle}
                    </h3>
                    <div className="flex items-center gap-2 text-foreground/60 base">
                        <FiCalendar size={16} />
                        <span>{year}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CommonCard;