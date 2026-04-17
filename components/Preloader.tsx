'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);
    const text = 'WELCOME';

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
            });

            tl.to('.char', {
                y: 0,
                stagger: 0.05,
                duration: 0.2,
            })
                .to('.preloader-item', {
                    delay: 1,
                    y: '100%',
                    duration: 0.5,
                    stagger: 0.1,
                })
                .to('.char', { autoAlpha: 0 }, '<0.5')
                .to(preloaderRef.current, { autoAlpha: 0 }, '<1');
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="preloader-item h-full w-[10%] bg-black"
                />
            ))}

            <p className="flex text-[20vw] lg:text-[200px] font-anton text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden">
                {text.split('').map((char, i) => (
                    <span
                        key={i}
                        className="char inline-block translate-y-full"
                    >
                        {char}
                    </span>
                ))}
            </p>
        </div>
    );
};

export default Preloader;
