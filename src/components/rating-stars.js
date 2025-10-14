import React from 'react';
import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const RatingStars = ({ rating, maxRating = 10, size = 'md', showNumber = true }) => {
    // Convert rating to 5-star scale
    const normalizedRating = (rating / maxRating) * 5;
    const fullStars = Math.floor(normalizedRating);
    const hasHalfStar = normalizedRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
        xl: 'w-6 h-6',
    };

    const textSizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
        xl: 'text-lg',
    };

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {/* Full Stars */}
                {Array.from({ length: fullStars }).map((_, index) => (
                    <FaStar
                        key={`full-${index}`}
                        className={`${sizeClasses[size]} text-yellow-400`}
                    />
                ))}

                {/* Half Star */}
                {hasHalfStar && (
                    <FaStarHalfAlt className={`${sizeClasses[size]} text-yellow-400`} />
                )}

                {/* Empty Stars */}
                {Array.from({ length: emptyStars }).map((_, index) => (
                    <FiStar
                        key={`empty-${index}`}
                        className={`${sizeClasses[size]} text-foreground/30`}
                    />
                ))}
            </div>

            {/* Rating Number */}
            {showNumber && (
                <span className={`${textSizeClasses[size]} font-semibold text-foreground/80`}>
                    {rating ? rating.toFixed(1) : 'N/A'}
                </span>
            )}
        </div>
    );
};

export default RatingStars;