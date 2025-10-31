import React from 'react';
import { FiStar, FiCalendar } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

const AnimeCard = ({ mal_id, title, images, score, aired, synopsis, type, episodes }) => {
    const imageUrl = images?.jpg?.large_image_url || images?.jpg?.image_url || '/images/ratio-1-1-size-200-200.jpg';
    const year = aired?.from ? new Date(aired.from).getFullYear() : 'N/A';
    const rating = score ? score.toFixed(1) : 'N/A';
    
    return (
        <Link 
            href={`/anime/${mal_id}`}
            className="group block"
        >
            <div className="relative overflow-hidden rounded-2xl bg-foreground/5 transition-all duration-300 hover:scale-105 hover:shadow-shadow">
                {/* Image Container */}
                <div className="relative aspect-[2/3] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating Badge */}
                    {score > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full">
                            <FiStar className="text-yellow-400 w-4 h-4" />
                            <span className="text-white text-xs font-bold">{rating}</span>
                        </div>
                    )}

                    {/* Type Badge */}
                    {type && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 backdrop-blur-sm rounded-full">
                            <span className="text-white text-xs font-bold uppercase">{type}</span>
                        </div>
                    )}
                    
                    {/* Hover Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {synopsis || 'No description available.'}
                        </p>
                    </div>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                    <h3 className="font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors duration-300">
                        {title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-foreground/60 text-sm">
                        <div className="flex items-center gap-2">
                            <FiCalendar className="w-4 h-4" />
                            <span>{year}</span>
                        </div>
                        {episodes && (
                            <span className="text-xs">{episodes} eps</span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default AnimeCard;