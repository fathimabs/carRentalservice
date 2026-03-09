import React, { forwardRef } from 'react';

const Input = forwardRef(
    ({ label, id, type = 'text', error, className = '', ...props }, ref) => {
        return (
            <div className={`flex flex-col gap-1 ${className}`}>
                {label && (
                    <label htmlFor={id} className="text-base font-semibold text-[#1A202C] mb-2">
                        {label}
                    </label>
                )}
                <input
                    id={id}
                    type={type}
                    ref={ref}
                    className={`
            flex h-12 w-full rounded-[10px] border-none bg-[#F6F7F9] px-4 py-3 text-sm text-[#1A202C] placeholder:text-[#90A3BF]
            focus:outline-none focus:ring-2 focus:ring-[#3563E9] disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'ring-2 ring-red-500' : ''}
          `}
                    {...props}
                />
                {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
