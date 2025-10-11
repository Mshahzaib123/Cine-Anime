"use client";

import React from 'react';
import clsx from 'clsx';

const ThemeInput = ({
    type = "text",
    variant = "fill",
    size = "md",
    className = "",
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    iconClassName = "",
    onLeftIconClick,
    onRightIconClick,
    leftIconProps = {},
    rightIconProps = {},
    ...inputProps
}) => {
    const baseClasses = clsx(
        "w-full rounded-full font-normal focus:outline-none transition-all duration-200"
    );
    const variants = {
        fill: clsx(
            "bg-foreground/6 border text-foreground border-transparent",
            "focus:border-primary focus:ring focus:ring-primary"
        ),
        outline: clsx(
            "bg-transparent border border-foreground/15",
            "focus:border-primary focus:ring focus:ring-primary"
        ),
    };
    const sizes = {
        sm: "px-4 py-[6px] small",
        md: "px-4 py-2 base",
        lg: "px-8 py-[10px] large",
    };
    const paddingLeft = LeftIcon ? 'pl-10' : '';
    const paddingRight = RightIcon ? 'pr-10' : '';

    const classes = clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        paddingLeft,
        paddingRight,
        className
    );
    const iconSizeClasses = clsx({
        'h-4 w-4': size === 'sm',
        'h-5 w-5': size === 'md',
        'h-6 w-6': size === 'lg',
    });
    return (
        <div className="relative flex items-center w-full">
            {LeftIcon && (
                <div
                    className={clsx(
                        "absolute left-3 top-1/2 -translate-y-1/2 flex",
                        iconClassName,
                        { 'cursor-pointer': onLeftIconClick }
                    )}
                    onClick={onLeftIconClick}
                    {...leftIconProps}
                >
                    <LeftIcon className={clsx("text-foreground/75",iconSizeClasses)} />
                </div>
            )}
            <input
                type={type}
                className={classes}
                {...inputProps}
            />
            {RightIcon && (
                <div
                    className={clsx(
                        "absolute right-3 top-1/2 -translate-y-1/2 flex",
                        iconClassName,
                        { 'cursor-pointer': onRightIconClick }
                    )}
                    onClick={onRightIconClick}
                    {...rightIconProps}
                >
                    <RightIcon className={clsx("text-foreground/75",iconSizeClasses)} />
                </div>
            )}
        </div>
    );
}

export default ThemeInput;