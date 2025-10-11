"use client";

import React from 'react';
import { useTheme } from '../context/theme-provider';
import { IoSunny, IoMoon } from 'react-icons/io5';

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <IoMoon size={20} /> : <IoSunny size={20} />}
        </button>
    );
}

export default ThemeSwitch;
