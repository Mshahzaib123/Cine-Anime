// src/context/theme-provider.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined); // Initialize with undefined for clarity

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

const defaultPrimaryColor = "#1d4ed8"; // Tailwind's blue-700

export function ThemeProvider({ children }) {
    // We'll initialize theme and primaryColor to a default,
    // and then update them client-side in useEffect.
    // Use a 'mounted' state to guard client-side effects.
    const [theme, setTheme] = useState("light"); // Default for SSR
    const [primaryColor, setPrimaryColor] = useState(defaultPrimaryColor); // Default for SSR
    const [mounted, setMounted] = useState(false); // To track if component is mounted on client

    useEffect(() => {
        setMounted(true); // Component is now mounted on the client
        
        // --- Theme Initialization ---
        const storedTheme = localStorage.getItem("theme");
        const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        
        // Set theme based on storage, system preference, or fall back to the initial default
        setTheme(storedTheme || systemPreference);

        // --- Primary Color Initialization ---
        const storedPrimaryColor = localStorage.getItem("primaryColor");
        // Set primary color based on storage or fall back to the initial default
        setPrimaryColor(storedPrimaryColor || defaultPrimaryColor); 
    }, []); // Run once on client mount

    // Effect to apply theme class to <html> (not body, for Tailwind's darkMode: 'class')
    useEffect(() => {
        if (mounted) { // Only run this effect if mounted client-side
            document.documentElement.classList.remove("light", "dark"); // Remove existing classes
            document.documentElement.classList.add(theme); // Add the current theme class
            localStorage.setItem("theme", theme);
        }
    }, [theme, mounted]);

    // Effect to apply primary color CSS variable to <html>
    useEffect(() => {
        if (mounted) { // Only run this effect if mounted client-side
            document.documentElement.style.setProperty("--primary-color", primaryColor);
            localStorage.setItem("primaryColor", primaryColor);
        }
    }, [primaryColor, mounted]);


    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
    };

    const changePrimaryColor = (color) => {
        setPrimaryColor(color);
    };

    const resetPrimaryColor = () => {
        setPrimaryColor(defaultPrimaryColor);
    };

    // We don't need to conditionally render children if the default states are fine for SSR.
    // The key is that the *effects* that change the DOM based on client-side state
    // only run *after* hydration using the 'mounted' flag.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, primaryColor, changePrimaryColor, resetPrimaryColor }}>
            {children}
        </ThemeContext.Provider>
    );
}