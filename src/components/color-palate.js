"use client";

import { useState } from "react";
import { useTheme } from "../context/theme-provider";

const initialColors = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f97316",
    "#8b5cf6",
];

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
};

const colorDistance = (rgb1, rgb2) => {
    return (
        Math.pow(rgb1.r - rgb2.r, 2) +
        Math.pow(rgb1.g - rgb2.g, 2) +
        Math.pow(rgb1.b - rgb2.b, 2)
    );
};


export default function ColorPalette() {
    const { changePrimaryColor, resetPrimaryColor } = useTheme();
    const [colors, setColors] = useState(initialColors);
    const [newColor, setNewColor] = useState("#000000");

    const handleColorChange = (newColor) => {
        changePrimaryColor(newColor);
    };

    const handleColorAdd = () => {
        const newRgb = hexToRgb(newColor);
        if (!newRgb) return;

        const isSimilar = colors.some((color) => {
            const existingRgb = hexToRgb(color);
            if (!existingRgb) return false;
            return colorDistance(newRgb, existingRgb) < 2000;
        });

        if (!colors.includes(newColor) && !isSimilar) {
            setColors([...colors, newColor]);
        }
        handleColorChange(newColor);
    };

    const handleReset = () => {
        resetPrimaryColor();
        setColors(initialColors);
    }

    return (
        <div className="flex flex-col items-start gap-6">
            <div className="flex items-center flex-wrap gap-4">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => handleColorChange(color)}
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            backgroundColor: color,
                            border: "2px solid #fff",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </div>
            <div className="flex items-center gap-4">
                <div className="relative w-[30px] h-[30px]">
                    <input
                        type="color"
                        value={newColor}
                        onChange={(e) => setNewColor(e.target.value)}
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-500">
                        +
                    </div>
                </div>
                <button
                    onClick={handleColorAdd}
                    style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: newColor,
                        border: "2px solid #fff",
                        cursor: "pointer",
                    }}
                />
            </div>
            <button
                onClick={handleReset}
                className="theme-btn cursor-pointer"
            >
                Reset
            </button>
        </div>
    );
}