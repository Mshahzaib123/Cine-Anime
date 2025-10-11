"use client";

import React from "react";
import Link from "next/link";
import clsx from "clsx";

const ThemeButton = ({
    href,
    children,
    variant = "fill",
    size = "md",
    className = "",
    ...props
}) => {
    const baseClasses =
        "flex items-center justify-center gap-2 font-bold transition-all duration-300 capitalize";
    const variants = {
        fill: clsx(
            "bg-primary text-secondary",
            "hover:bg-secondary hover:text-dark"
        ),
        outline: clsx(
            "border border-primary text-secondary bg-transparent",
            "hover:bg-primary hover:text-secondary hover:border-transparent"
        ),
    };
    const sizes = {
        sm: "px-4 py-[6px] text-xs",
        md: "px-4 pt-1.5 pb-[7px] text-sm",
        lg: "px-8 py-[10px] heading-m font-bold",
        icon: "size-10.5 justify-center cursor-pointer"
    };
    const classes = clsx(baseClasses, variants[variant], sizes[size], className);
    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }
    return (
        <button type="button" className={classes} {...props}>
            {children}
        </button>
    );
};

export default ThemeButton;
