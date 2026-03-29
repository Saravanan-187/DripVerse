import React from 'react';
import './Wave.css';

const Wave = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-[0]">
            <svg
                className="wave-editorial w-full h-[60px] md:h-[100px]"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className="wave-parallax1">
                    {/* Back layer - Dark for depth */}
                    <use xlinkHref="#gentle-wave" x="48" y="0" className="fill-black/40" />
                </g>
                <g className="wave-parallax2">
                    {/* Mid layer - Gray */}
                    <use xlinkHref="#gentle-wave" x="48" y="3" className="fill-gray-500/60" />
                </g>
                <g className="wave-parallax3">
                    {/* Front-mid layer - Light gray */}
                    <use xlinkHref="#gentle-wave" x="48" y="5" className="fill-gray-300/80" />
                </g>
                <g className="wave-parallax4">
                    {/* Front layer - White to merge with next section */}
                    <use xlinkHref="#gentle-wave" x="48" y="7" className="fill-white" />
                </g>
            </svg>
        </div>
    );
};

export default Wave;
