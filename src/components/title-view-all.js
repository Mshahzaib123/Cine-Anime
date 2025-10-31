import React from 'react';
import clsx from 'clsx';
import ThemeButton from './theme-button';
import { FiChevronRight } from 'react-icons/fi';

const TitleViewAll = ({className, TitleIcon, title, buttonText, href}) => {
    return (
        <div className={clsx(
            "flex items-center justify-between w-full",
            className
        )}>
            <div className="flex items-center gap-4">
                {TitleIcon && <TitleIcon className="text-foreground" size={40} />}
                <h2 className="heading-h2 text-foreground">{title}</h2>
            </div>
            <ThemeButton href={href} variant="ghost">
                {buttonText}
                <FiChevronRight size={20} />
            </ThemeButton>
        </div>
    );
}

export default TitleViewAll;
