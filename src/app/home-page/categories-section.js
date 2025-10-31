"use client";

import React, { useState, useEffect } from 'react';
import { FiGrid, FiChevronRight } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import { fetchGenres } from '@/lib/api';
import TitleViewAll from '@/components/title-view-all';

const CategoryCard = ({ id, name }) => {
    return (
        <ThemeButton 
            href={`/categories?genre=${id}`}
            variant="outline"
            className="h-20 group rounded-2xl!"
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
                const movieGenres = await fetchGenres('movie');
                setGenres(movieGenres.slice(0, 12));
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
            <section className="my-28">
                <div className="container">
                    <div className="animate-pulse space-y-4">
                        <div className="h-10 bg-foreground/10 rounded w-1/3" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i} className="h-20  bg-foreground/10 rounded-2xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="my-28">
            <div className="container">
                <TitleViewAll
                    className="mb-6"
                    TitleIcon={FiGrid}
                    title="Browse by Category"
                    buttonText="View All"
                    href="/categories"
                />
                <div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
                    data-animate="up"
                    data-delay="0.1"
                >
                    {genres.map((genre) => (
                        <CategoryCard key={genre.id} {...genre} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;