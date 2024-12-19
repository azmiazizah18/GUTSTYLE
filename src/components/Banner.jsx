import React, { useRef } from 'react';

const Banner = () => {
    const scrollToRef = useRef(null);

    const handleExploreClick = () => {
        if (scrollToRef.current) {
            scrollToRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="relative bg-cover bg-center h-64 text-white flex flex-col justify-center items-center" style={{ backgroundImage: `url('/path-to-banner-image.jpg')` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-60"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold mb-2">Discover Quality and Elegance</h1>
                    <p className="text-lg">Find the perfect match for every occasion.</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <button
                            onClick={handleExploreClick}
                            className="bg-blue-500 px-4 py-2 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
                        >
                            Explore Now
                        </button>
                    </div>
                </div>
            </div>
            <div ref={scrollToRef} className="p-4">
                <h6 className="text-2xl font-bold"></h6>
            </div>
        </>
    );
};

export default Banner;
