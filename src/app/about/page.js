"use client";

import React from 'react';
import { FiInfo, FiHeart, FiTarget, FiUsers, FiTrendingUp } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';

const AboutPage = () => {
    const features = [
        {
            icon: FiTrendingUp,
            title: 'Discover Trending',
            description: 'Stay up-to-date with the latest trending movies, TV shows, and anime from around the world.',
        },
        {
            icon: FiHeart,
            title: 'Personalized Watchlist',
            description: 'Create and manage your personal watchlist to keep track of content you want to watch.',
        },
        {
            icon: FiTarget,
            title: 'Smart Recommendations',
            description: 'Get personalized recommendations based on your viewing preferences and ratings.',
        },
        {
            icon: FiUsers,
            title: 'Community Ratings',
            description: 'See what the community thinks with comprehensive ratings and reviews.',
        },
    ];

    const stats = [
        { number: '1M+', label: 'Movies & Shows' },
        { number: '50K+', label: 'Anime Series' },
        { number: '100K+', label: 'Happy Users' },
        { number: '24/7', label: 'Available' },
    ];

    return (
        <main className="min-h-screen py-16">
            <div className="container max-w-6xl">
                {/* Header */}
                <div className="text-center mb-16" data-animate="up">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                        <FiInfo className="text-primary w-10 h-10" />
                    </div>
                    <h1 className="heading-h1 text-foreground mb-4">
                        About EigaPulse
                    </h1>
                    <p className="large text-foreground/70 max-w-3xl mx-auto">
                        Your ultimate destination for discovering and exploring the world of entertainment
                    </p>
                </div>

                {/* Mission Section */}
                <section className="mb-28" data-animate="up" data-delay="0.1">
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-8 md:p-12 border border-primary/20">
                        <h2 className="heading-h2 text-foreground mb-6">Our Mission</h2>
                        <p className="large text-foreground/80 leading-relaxed mb-6">
                            At EigaPulse, we believe that everyone deserves easy access to great entertainment. Our mission is to help you discover movies, TV shows, and anime that match your interests and preferences.
                        </p>
                        <p className="large text-foreground/80 leading-relaxed">
                            We combine comprehensive databases with intuitive design to create a seamless discovery experience. Whether you are looking for the latest blockbuster, a hidden gem, or your next binge-worthy series, EigaPulse is here to guide you.
                        </p>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className="mb-28" data-animate="up" data-delay="0.2">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10 text-center hover:shadow-shadow transition-all duration-300"
                            >
                                <div className="heading-h2 text-primary mb-2">{stat.number}</div>
                                <p className="text-foreground/70 font-semibold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Grid */}
                <section className="mb-28" data-animate="up" data-delay="0.3">
                    <h2 className="heading-h2 text-foreground text-center mb-12">
                        What We Offer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10 hover:shadow-shadow transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                                    <feature.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="heading-h4 text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-foreground/70 base">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Technology Stack */}
                <section className="mb-28" data-animate="up" data-delay="0.4">
                    <div className="bg-foreground/5 rounded-3xl p-8 md:p-12 border border-foreground/10">
                        <h2 className="heading-h2 text-foreground mb-6">Built With Modern Technology</h2>
                        <p className="large text-foreground/80 mb-8">
                            EigaPulse is built using cutting-edge web technologies to ensure a fast, responsive, and beautiful user experience across all devices.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="heading-h5 text-foreground mb-3">Frontend</h3>
                                <ul className="space-y-2 text-foreground/70">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        Next.js 15 - React Framework
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        React 19 - UI Library
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        Tailwind CSS - Styling
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        GSAP - Animations
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="heading-h5 text-foreground mb-3">Data Sources</h3>
                                <ul className="space-y-2 text-foreground/70">
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        TMDB API - Movies & TV Shows
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        Jikan API - Anime Data
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        YouTube - Trailers
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team/Vision Section */}
                <section className="mb-28" data-animate="up" data-delay="0.5">
                    <div className="bg-foreground/5 rounded-3xl p-8 md:p-12 border border-foreground/10">
                        <h2 className="heading-h2 text-foreground mb-6">Our Vision</h2>
                        <p className="large text-foreground/80 leading-relaxed mb-6">
                            We envision a world where discovering great entertainment is effortless and enjoyable. Our goal is to become the go-to platform for entertainment discovery, providing users with the tools they need to find content they will love.
                        </p>
                        <p className="large text-foreground/80 leading-relaxed">
                            As we continue to grow, we are committed to adding new features, improving existing ones, and listening to our community feedback to make EigaPulse the best it can be.
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="text-center" data-animate="up" data-delay="0.6">
                    <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl p-12 border border-primary/20">
                        <h2 className="heading-h2 text-foreground mb-4">
                            Ready to Start Exploring?
                        </h2>
                        <p className="large text-foreground/70 mb-8 max-w-2xl mx-auto">
                            Join thousands of users who are already discovering amazing content on EigaPulse
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <ThemeButton href="/signup" size="lg">
                                Get Started Free
                            </ThemeButton>
                            <ThemeButton href="/trending" size="lg" variant="outline">
                                Explore Trending
                            </ThemeButton>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AboutPage;