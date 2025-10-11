"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function wrapCharacters(text) {
    return text
        .split(' ')
        .map((word) => {
            const wordWrapped = word
                .split('')
                .map((char) => `<span class="char font-fontBold opacity-0" style="display:inline-block;">${char}</span>`)
                .join('');
            return `<span class="word overflow-hidden" style="display:inline-block;">${wordWrapped}</span>`;
        })
        .join('<span style="display:inline-block;">&nbsp;</span>');
}

function animateText(el) {
    el.innerHTML = wrapCharacters(el.textContent);

    const duration = parseFloat(el.getAttribute('data-duration')) || 0.7;
    const delay = parseFloat(el.getAttribute('data-delay')) || 0;
    const scrollStart = el.getAttribute('data-scroll-start') || "top 80%";

    gsap.fromTo(
        el.querySelectorAll(".char"),
        { y: 100, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: duration,
            delay: delay,
            stagger: 0.04,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: scrollStart,
                toggleActions: "restart none none reverse",
            },
        }
    );
}

function runAnimations() {
    document.querySelectorAll("[data-animate='overlay']").forEach((el) => {
        const duration = parseFloat(el.getAttribute('data-duration')) || 2;
        const delay = parseFloat(el.getAttribute('data-delay')) || 1.3;

        gsap.fromTo(
            el,
            { x: "0%" },
            {
                x: "-100%",
                duration: duration,
                ease: "power2.out",
                delay: delay,
            }
        );
    });

    document.querySelectorAll("[data-animate='content']").forEach((el) => {
        const duration = parseFloat(el.getAttribute('data-duration')) || 1;
        const delay = parseFloat(el.getAttribute('data-delay')) || 2;

        gsap.fromTo(
            el,
            { y: "120%", opacity: 0 },
            {
                y: "0%",
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power1.inOut",
            }
        );
    });

    document.querySelectorAll("[data-animate='up']").forEach((el) => {
        const duration = parseFloat(el.getAttribute('data-duration')) || 1;
        const delay = parseFloat(el.getAttribute('data-delay')) || 0;
        const upFrom = parseFloat(el.getAttribute('data-up-from')) || 120;
        const scrollStart = el.getAttribute('data-scroll-start') || "top 90%";

        gsap.fromTo(
            el,
            { y: upFrom, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: el,
                    start: scrollStart,
                    toggleActions: "restart none none reverse",
                },
            }
        );
    });

    document.querySelectorAll("[data-animate='zoom']").forEach((el) => {
        const duration = parseFloat(el.getAttribute('data-duration')) || 1;
        const delay = parseFloat(el.getAttribute('data-delay')) || 0;
        const scrollStart = el.getAttribute('data-scroll-start') || "top 80%";

        gsap.fromTo(
            el,
            { opacity: 0.5, scale: 1.1, },
            {
                scale: 1,
                opacity: 1,
                duration: duration,
                delay: delay,
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: el,
                    start: scrollStart,
                    end: 'bottom 20%',
                    toggleActions: "restart none none reverse",
                },
            }
        );
    });

    document.querySelectorAll("[data-animate='heading1']").forEach((el) =>
        animateText(el)
    );
    document.querySelectorAll("[data-animate='heading2']").forEach((el) =>
        animateText(el)
    );
}

export default function AnimationProvider({ children }) {
    useEffect(() => {
        runAnimations();
    }, []);

    return children;
}