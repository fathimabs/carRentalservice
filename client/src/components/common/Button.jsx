import React from 'react';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    ...props
}) => {
    const baseStyles =
        'inline-flex items-center justify-center rounded-[10px] font-semibold transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-95';

    const variants = {
        primary: 'bg-[#3563E9] text-white hover:bg-blue-700',
        secondary: 'bg-[#54A6FF] text-white hover:bg-blue-400',
        outline: 'border border-[#90A3BF] bg-transparent hover:bg-gray-50 text-[#596780]',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizes = {
        sm: 'h-9 px-4 text-sm',
        md: 'h-12 py-3 px-5 text-base',
        lg: 'h-14 px-10 text-lg',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes.md} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
