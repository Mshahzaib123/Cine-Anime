"use client";

import React from 'react';
import { useTheme } from '../context/theme-provider';
import { IoSunny, IoMoon } from 'react-icons/io5';
import ThemeButton from './theme-button';

const ThemeSwitch = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <ThemeButton size='icon' variant='ghost' onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <IoMoon size={20} /> : <IoSunny size={20} />}
        </ThemeButton>
    );
}

export default ThemeSwitch;
