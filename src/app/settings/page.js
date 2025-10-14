"use client";

import React from 'react';
import ColorPalette from '@/components/color-palate';
import ThemeSwitch from '@/components/theme-switch';
import { useTheme } from '@/context/theme-provider';
import { FiSettings, FiMoon } from 'react-icons/fi';
import { FaPalette } from "react-icons/fa";

const SettingsPage = () => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen py-16">
      <div className="container max-w-4xl">
        {/* Page Header */}
        <div className="mb-12" data-animate="up">
          <div className="flex items-center gap-3 mb-2">
            <FiSettings className="text-primary w-10 h-10" />
            <h1 className="heading-h1 text-foreground">Settings</h1>
          </div>
          <p className="large text-foreground/70">
            Customize your EigaPulse experience
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {/* Theme Settings */}
          <div 
            className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10"
            data-animate="up"
            data-delay="0.1"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiMoon className="text-primary w-6 h-6" />
              <h2 className="heading-h3 text-foreground">Appearance</h2>
            </div>
            
            <div className="space-y-6">
              {/* Dark Mode Toggle */}
              <div className="flex items-center justify-between py-4 border-b border-foreground/10">
                <div>
                  <h3 className="heading-h6 text-foreground mb-1">Theme Mode</h3>
                  <p className="small text-foreground/60">
                    Switch between light and dark mode
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="small text-foreground/70 capitalize">{theme}</span>
                  <ThemeSwitch />
                </div>
              </div>
            </div>
          </div>

          {/* Color Customization */}
          <div 
            className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10"
            data-animate="up"
            data-delay="0.2"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaPalette className="text-primary w-6 h-6" />
              <h2 className="heading-h3 text-foreground">Color Scheme</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="heading-h6 text-foreground mb-2">Primary Color</h3>
                <p className="small text-foreground/60 mb-4">
                  Choose your preferred accent color. This will be used for buttons, links, and highlights throughout the app.
                </p>
              </div>
              <ColorPalette />
            </div>
          </div>

          {/* About Section */}
          <div 
            className="bg-foreground/5 rounded-3xl p-8 border border-foreground/10"
            data-animate="up"
            data-delay="0.3"
          >
            <h2 className="heading-h3 text-foreground mb-4">About EigaPulse</h2>
            <div className="space-y-3 text-foreground/70 base">
              <p>
                <strong className="text-foreground">Version:</strong> 1.0.0
              </p>
              <p>
                <strong className="text-foreground">Built with:</strong> Next.js 15, React 19, Tailwind CSS, GSAP
              </p>
              <p>
                <strong className="text-foreground">Data Source:</strong> TMDB API & Jikan API
              </p>
              <p className="pt-4 border-t border-foreground/10">
                EigaPulse is your ultimate destination for discovering movies, TV shows, and anime. 
                Explore trending content, create watchlists, and enjoy a beautifully crafted viewing experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;