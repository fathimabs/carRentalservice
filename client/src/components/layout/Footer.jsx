import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-white px-4 sm:px-16 py-10 sm:py-20 mt-auto">
            <div className="max-w-[1440px] mx-auto">
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-0 pb-16 border-b border-[#131313] border-opacity-10">
                    <div className="max-w-[292px] text-center lg:text-left mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold text-[#3563E9] tracking-tight mb-4">MORENT</h2>
                        <p className="text-[#596780] font-medium leading-[150%]">
                            Our vision is to provide convenience and increase your sales business.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                        <div className="flex flex-col gap-6 items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-xl font-bold text-[#1A202C]">About</h3>
                            <ul className="flex flex-col gap-5 text-[#596780] font-medium">
                                <li className="hover:text-[#3563E9] cursor-pointer">How it works</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Featured</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Partnership</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Bussiness Relation</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-xl font-bold text-[#1A202C]">Community</h3>
                            <ul className="flex flex-col gap-5 text-[#596780] font-medium">
                                <li className="hover:text-[#3563E9] cursor-pointer">Events</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Blog</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Podcast</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Invite a friend</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-6 items-center sm:items-start text-center sm:text-left col-span-2 sm:col-span-1">
                            <h3 className="text-xl font-bold text-[#1A202C]">Socials</h3>
                            <ul className="flex flex-col gap-5 text-[#596780] font-medium">
                                <li className="hover:text-[#3563E9] cursor-pointer">Discord</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Instagram</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Twitter</li>
                                <li className="hover:text-[#3563E9] cursor-pointer">Facebook</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-9 gap-8 sm:gap-0 font-bold text-[#1A202C]">
                    <p className="text-center sm:text-left w-full sm:w-auto">©{new Date().getFullYear()} MORENT. All rights reserved</p>
                    <div className="flex justify-center sm:justify-end gap-10 w-full sm:w-auto">
                        <span className="hover:text-[#3563E9] cursor-pointer whitespace-nowrap">Privacy & Policy</span>
                        <span className="hover:text-[#3563E9] cursor-pointer whitespace-nowrap">Terms & Condition</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
