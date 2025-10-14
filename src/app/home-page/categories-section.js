"use client";

import React, { useState, useEffect } from 'react';
import { FiGrid, FiChevronRight } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import { fetchGenres } from '@/lib/api';

const CategoryCard = ({ id, name }) => {
    return (
        <ThemeButton 
            href={`/categories?genre=${id}`}
            variant="outline"
            className="w-full justify-between group"
        >
            <span>{name}</span>
            <FiChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </ThemeButton>
    );
};

const CategoriesSection = () => {
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                // Fetch movie genres
                const movieGenres = await fetchGenres('movie');
                setGenres(movieGenres.slice(0, 8)); // Show only 8 categories
            } catch (error) {
                console.error('Failed to load genres:', error);
            } finally {
                setLoading(false);
            }
        };

        loadGenres();
    }, []);

    if (loading) {
        return (
            <section className="py-16 container">
                <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-foreground/10 rounded w-1/3" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="h-12 bg-foreground/10 rounded" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 container">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-8" data-animate="up">
                <div className="flex items-center gap-3">
                    <FiGrid className="text-primary w-8 h-8" />
                    <h2 className="heading-h2 text-foreground">Browse by Category</h2>
                </div>
                <ThemeButton href="/categories" variant="ghost">
                    View All
                    <FiChevronRight className="w-5 h-5" />
                </ThemeButton>
            </div>

            {/* Categories Grid */}
            <div 
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
                data-animate="up"
                data-delay="0.1"
            >
                {genres.map((genre) => (
                    <CategoryCard key={genre.id} {...genre} />
                ))}
            </div>
        </section>
    );
};

export default CategoriesSection;