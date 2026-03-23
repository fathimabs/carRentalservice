import React from 'react';

const footerLinks = [
    {
        title: 'About',
        links: [
            { name: 'How it works', url: '#' },
            { name: 'Featured', url: '#' },
            { name: 'Partnership', url: '#' },
            { name: 'Business Relation', url: '#' },
        ],
    },
    {
        title: 'Community',
        links: [
            { name: 'Events', url: '#' },
            { name: 'Blog', url: '#' },
            { name: 'Podcast', url: '#' },
            { name: 'Invite a friend', url: '#' },
        ],
    },
    {
        title: 'Socials',
        links: [
            { name: 'Discord', url: '#' },
            { name: 'Instagram', url: '#' },
            { name: 'Twitter', url: '#' },
            { name: 'Facebook', url: '#' },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="bg-white border-t border-[#C3D4E9] border-opacity-40 font-['Plus_Jakarta_Sans',_sans-serif]">
            <div className="max-w-[1440px] mx-auto min-h-[480px] flex flex-col justify-between px-4 md:px-16 py-10 md:py-20">
                {/* Main Content */}
                <div className="flex flex-col md:flex-row justify-between gap-10">
                    {/* Brand Section */}
                    <div className="max-w-[292px] transition-all duration-300 hover:translate-y-[-2px]">
                        <h2 className="text-[32px] font-bold text-[#3563E9] leading-[150%] tracking-[-0.03em] mb-4 font-['Plus_Jakarta_Sans']">MORENT</h2>
                        <p className="text-[#596780] text-base leading-relaxed opacity-60">
                            Our vision is to provide convenience and help increase your sales business.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 sm:gap-16">
                        {footerLinks.map((section) => (
                            <div key={section.title} className="flex flex-col gap-6">
                                <h3 className="text-[20px] font-semibold text-[#1A202C] leading-[150%] tracking-[-0.02em]">
                                    {section.title}
                                </h3>
                                <ul className="flex flex-col gap-4">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <a
                                                href={link.url}
                                                className="text-[#596780] text-base font-medium opacity-60 hover:text-[#3563E9] hover:opacity-100 transition-all duration-200"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 md:mt-16 pt-9 border-t border-[#C3D4E9] border-opacity-40 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[#1A202C] font-semibold text-base leading-[150%] tracking-[-0.02em] w-full md:w-[292px] order-2 md:order-1">
                        ©2022 MORENT. All rights reserved
                    </p>
                    <div className="flex justify-between md:justify-end gap-8 md:gap-14 w-full md:w-auto order-1 md:order-2">
                        <a href="#" className="text-[#1A202C] font-semibold text-base leading-[150%] tracking-[-0.02em] w-auto md:w-[144px] text-right hover:text-[#3563E9] transition-colors whitespace-nowrap">
                            Privacy & Policy
                        </a>
                        <a href="#" className="text-[#1A202C] font-semibold text-base leading-[150%] tracking-[-0.02em] w-auto md:w-[144px] text-right hover:text-[#3563E9] transition-colors whitespace-nowrap">
                            Terms & Condition
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
