import React from 'react';
import Card from '../components/Card';
import landingBg from '../assets/landingpage.png';
import logoIcon from '../assets/star.png';
import logoText from '../assets/runexus-text.png';

export default function LandingPage() {
    return (
        <div
            className="bg-cover bg-center min-h-screen flex flex-col"
            style={{ backgroundImage: `url(${landingBg})` }}
        >
            {/* Yazı + Buton Alanı */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-20 ">
                {/* Sol Yazı */}
                <div className="max-w-lg text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Find Your Next Run
                    </h1>
                    <p className="text-black-600 text-lg mb-8">
                        Join local running events, connect with runners like you, and track your journey — all in one place.
                    </p>
                    <button className="bg-orange-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-orange-700 transition duration-300">
                        Let’s Run
                    </button>
                </div>

            </div>
        </div>
    );
}