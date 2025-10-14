import React from 'react';

const LoadingSkeleton = ({ count = 6 }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse"
                >
                    {/* Card Container */}
                    <div className="overflow-hidden rounded-2xl bg-foreground/5">
                        {/* Image Skeleton */}
                        <div className="aspect-[2/3] bg-foreground/10" />
                        
                        {/* Content Skeleton */}
                        <div className="p-4 space-y-3">
                            {/* Title Lines */}
                            <div className="h-4 bg-foreground/10 rounded w-full" />
                            <div className="h-4 bg-foreground/10 rounded w-3/4" />
                            
                            {/* Meta Info */}
                            <div className="h-3 bg-foreground/10 rounded w-1/2" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;