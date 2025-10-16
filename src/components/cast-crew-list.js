"use client";

import React from 'react';
import Image from 'next/image';
import { FiUser } from 'react-icons/fi';
import { getImageUrl } from '@/lib/api';

const CastMemberCard = ({ profile_path, name, character }) => {
    const imageUrl = profile_path 
        ? getImageUrl(profile_path) 
        : null;

    return (
        <div className="flex-shrink-0 w-32">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-foreground/5 mb-2">
                {imageUrl ? (
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="128px"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-foreground/10">
                        <FiUser className="w-12 h-12 text-foreground/30" />
                    </div>
                )}
            </div>
            <div>
                <p className="font-semibold text-foreground text-sm line-clamp-2 mb-1">
                    {name}
                </p>
                <p className="text-foreground/60 text-xs line-clamp-2">
                    {character}
                </p>
            </div>
        </div>
    );
};

const CastCrewList = ({ credits }) => {
    const cast = credits.cast?.slice(0, 12) || [];
    const director = credits.crew?.find(person => person.job === 'Director');
    const writers = credits.crew?.filter(
        person => person.job === 'Writer' || person.job === 'Screenplay'
    ).slice(0, 3) || [];

    if (cast.length === 0 && !director && writers.length === 0) {
        return null;
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="heading-h3 text-foreground mb-6">Cast & Crew</h2>
                
                {/* Key Crew Members */}
                {(director || writers.length > 0) && (
                    <div className="mb-8 p-6 bg-foreground/5 rounded-2xl border border-foreground/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {director && (
                                <div>
                                    <p className="text-foreground/60 small mb-1">Director</p>
                                    <p className="font-semibold text-foreground">{director.name}</p>
                                </div>
                            )}
                            
                            {writers.length > 0 && (
                                <div>
                                    <p className="text-foreground/60 small mb-1">Writer{writers.length > 1 ? 's' : ''}</p>
                                    <p className="font-semibold text-foreground">
                                        {writers.map(w => w.name).join(', ')}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Cast Carousel */}
                {cast.length > 0 && (
                    <div>
                        <h3 className="heading-h5 text-foreground mb-4">Top Cast</h3>
                        <div className="overflow-x-auto pb-4 -mx-4 px-4">
                            <div className="flex gap-4">
                                {cast.map((member) => (
                                    <CastMemberCard
                                        key={member.id}
                                        {...member}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CastCrewList;