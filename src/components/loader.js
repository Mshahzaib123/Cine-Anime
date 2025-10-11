"use client"

import React from 'react';

const Loader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full z-[999999] bg-dark2">
            <div className="absolute top-1/2 left-1/2 size-10 loading">
                <span className="loader absolute block size-5 bg-primary top-0 left-0"></span>
                <span className="loader absolute block size-5 bg-primary top-0 right-0"></span>
                <span className="loader absolute block size-5 bg-primary bottom-0 left-0"></span>
                <span className="loader absolute block size-5 bg-primary bottom-0 right-0"></span>
            </div>
        </div>
    );
}

export default Loader;
