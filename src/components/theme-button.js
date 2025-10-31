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
    const baseClasses = clsx(
        "flex items-center justify-center text-center gap-2 cursor-pointer leading-[125%]!",
        "font-bold transition-all duration-400 ease-in-out",
        "rounded-full overflow-hidden"
    );
    const variants = {
        fill: clsx(
            "bg-primary border border-primary text-white",
            "hover:shadow-shadow"
        ),
        outline: clsx(
            "border border-foreground/15 text-foreground/80 bg-foreground/6",
            "hover:bg-primary hover:text-white hover:border-transparent",
            "hover:shadow-shadow"
        ),
        ghost: clsx(
            "bg-transparent text-foreground/80",
            "hover:bg-foreground/5 hover:text-primary"
        ),
    };
    const sizes = {
        sm: "px-4 py-[6px] small",
        md: "px-4 py-2 base",
        lg: "px-8 py-[10px] large",
        icon: "size-10.5 justify-center"
    };
    const classes = clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        className
    );

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