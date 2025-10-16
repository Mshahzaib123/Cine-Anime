"use client";

import React, { useState, useEffect } from 'react';
import { FiUser, FiEdit2, FiMail, FiCalendar, FiBookmark, FiHeart, FiEye } from 'react-icons/fi';
import ThemeButton from '@/components/theme-button';
import CommonCard from '@/components/common-card';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
    });

    useEffect(() => {
        loadUserData();
        loadWatchlist();
    }, []);

    const loadUserData = () => {
        // Check if user is logged in
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const userData = JSON.parse(savedUser);
            setUser(userData);
            setFormData({
                name: userData.name || '',
                email: userData.email || '',
                bio: userData.bio || '',
            });
        }
    };

    const loadWatchlist = () => {
        try {
            const saved = localStorage.getItem('watchlist');
            const items = saved ? JSON.parse(saved) : [];
            setWatchlist(items);
        } catch (error) {
            console.error('Failed to load watchlist:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveProfile = () => {
        const updatedUser = {
            ...user,
            ...formData,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('user');
            router.push('/login');
        }
    };

    // If no user, show login prompt
    if (!user) {
        return (
            <>
                <main className="min-h-screen py-16">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center py-24" data-animate="up">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
                                <FiUser className="w-12 h-12 text-primary" />
                            </div>
                            <h1 className="heading-h2 text-foreground mb-4">
                                Not Logged In
                            </h1>
                            <p className="large text-foreground/70 mb-8">
                                Please login or create an account to view your profile
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <ThemeButton href="/login" size="lg">
                                    Login
                                </ThemeButton>
                                <ThemeButton href="/signup" size="lg" variant="outline">
                                    Sign Up
                                </ThemeButton>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    const stats = [
        {
            icon: FiBookmark,
            label: 'Watchlist',
            value: watchlist.length,
            color: 'text-blue-500',
        },
        {
            icon: FiHeart,
            label: 'Favorites',
            value: watchlist.filter(item => item.vote_average >= 8).length,
            color: 'text-red-500',
        },
        {
            icon: FiEye,
            label: 'Watched',
            value: '0',
            color: 'text-green-500',
        },
    ];

    return (
        <>
            <main className="min-h-screen py-16">
                <div className="container max-w-6xl">
                    {/* Profile Header */}
                    <div className="mb-12" data-animate="up">
                        <div className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                                {/* Avatar */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
                                        <span className="text-white text-5xl font-bold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1">
                                    {!isEditing ? (
                                        <>
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h1 className="heading-h2 text-foreground mb-2">
                                                        {user.name || 'Anonymous User'}
                                                    </h1>
                                                    <div className="flex items-center gap-2 text-foreground/60 mb-2">
                                                        <FiMail className="w-4 h-4" />
                                                        <span className="base">{user.email || 'No email'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-foreground/60">
                                                        <FiCalendar className="w-4 h-4" />
                                                        <span className="base">
                                                            Joined {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <ThemeButton
                                                    onClick={() => setIsEditing(true)}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <FiEdit2 className="w-4 h-4" />
                                                    Edit Profile
                                                </ThemeButton>
                                            </div>
                                            {user.bio && (
                                                <p className="text-foreground/70 base max-w-2xl">
                                                    {user.bio}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        /* Edit Form */
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-foreground/80 font-semibold mb-2 small">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground focus:outline-none focus:border-primary"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-foreground/80 font-semibold mb-2 small">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground focus:outline-none focus:border-primary"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-foreground/80 font-semibold mb-2 small">
                                                    Bio
                                                </label>
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-4 py-2 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground focus:outline-none focus:border-primary resize-none"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <ThemeButton onClick={handleSaveProfile}>
                                                    Save Changes
                                                </ThemeButton>
                                                <ThemeButton
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setFormData({
                                                            name: user.name || '',
                                                            email: user.email || '',
                                                            bio: user.bio || '',
                                                        });
                                                    }}
                                                    variant="outline"
                                                >
                                                    Cancel
                                                </ThemeButton>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-animate="up" data-delay="0.1">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-foreground/5 rounded-2xl p-6 border border-foreground/10 hover:shadow-shadow transition-all duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl bg-foreground/10 ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-foreground/60 small">{stat.label}</p>
                                        <p className="heading-h3 text-foreground">{stat.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Watchlist */}
                    {watchlist.length > 0 && (
                        <div data-animate="up" data-delay="0.2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="heading-h3 text-foreground">Recent Watchlist</h2>
                                <ThemeButton href="/watchlist" variant="ghost">
                                    View All
                                </ThemeButton>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {watchlist.slice(0, 6).map((item) => (
                                    <CommonCard
                                        key={item.id}
                                        {...item}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Account Actions */}
                    <div className="mt-12 pt-8 border-t border-foreground/10" data-animate="up" data-delay="0.3">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h3 className="heading-h5 text-foreground mb-1">Account Settings</h3>
                                <p className="text-foreground/60 small">
                                    Manage your account preferences
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <ThemeButton href="/settings" variant="outline">
                                    Settings
                                </ThemeButton>
                                <ThemeButton onClick={handleLogout} variant="outline">
                                    Logout
                                </ThemeButton>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProfilePage;