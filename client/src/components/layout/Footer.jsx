import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white px-4 md:px-16 py-10 md:py-20 mt-auto">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row justify-between pb-8 md:pb-16 border-b border-[#131313] border-opacity-10 gap-12 lg:gap-0">
                    {/* Left Section: Logo & Vision */}
                    <div className="max-w-[292px]">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3563E9] tracking-tight mb-4">MORENT</h2>
                        <p className="text-[#131313]/60 font-medium leading-[150%] text-xs md:text-base pr-4 md:pr-0">
                            Our vision is to provide convenience and help increase your sales business.
                        </p>
                    </div>

                    {/* Right Section: Links Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16 lg:gap-24">
                        {/* About */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h3 className="text-xl font-semibold text-[#1A202C]">About</h3>
                            <ul className="flex flex-col gap-3 md:gap-5 text-[#131313]/60 font-medium text-sm md:text-base">
                                <li className="hover:text-[#3563E9] cursor-pointer">How it works</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Featured</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Partnership</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Business Relation</li>
                            </ul>
                        </div>

                        {/* Community */}
                        <div className="flex flex-col gap-4 md:gap-6">
                            <h3 className="text-xl font-semibold text-[#1A202C]">Community</h3>
                            <ul className="flex flex-col gap-3 md:gap-5 text-[#131313]/60 font-medium text-sm md:text-base">
                                <li className="hover:text-[#3563E9] cursor-pointer">Events</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Blog</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Podcast</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Invite a friend</li>
                            </ul>
                        </div>

                        {/* Socials - drops to new row on small mobile, but side by side on lg */}
                        <div className="flex flex-col gap-4 md:gap-6 col-span-2 lg:col-span-1">
                            <h3 className="text-xl font-semibold text-[#1A202C]">Socials</h3>
                            <ul className="flex flex-col gap-3 md:gap-5 text-[#131313]/60 font-medium text-sm md:text-base">
                                <li className="hover:text-[#3563E9] cursor-pointer">Discord</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Instagram</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Twitter</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Facebook</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center pt-8 font-semibold text-[#1A202C] text-sm md:text-base">
                    <p className="w-full md:w-auto mt-8 md:mt-0 text-left md:text-left">©{new Date().getFullYear()} MORENT. All rights reserved</p>
                    <div className="flex justify-between w-full md:w-auto md:justify-end md:gap-14">
                        <span className="hover:text-[#3563E9] cursor-pointer">Privacy & Policy</span>
                        <span className="hover:text-[#3563E9] cursor-pointer">Terms & Condition</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
