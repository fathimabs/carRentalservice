import React from 'react';
import StarIcon from '../common/Icons/StarIcon'

const ReviewCard = ({ name, role, date, rating, comment, avatar }) => {
    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} filled={i < Math.round(rating)} />
        ));

    return (

        <div className="flex flex-col gap-3 py-5 border-b border-[#F6F7F9] last:border-0">

            {/* Top Row */}
            <div className="flex items-start justify-between gap-4">

                {/* Left */}
                <div className="flex items-center gap-3">
                    <img
                        src={avatar || `https://ui-avatars.com/api/?name=${name}`}
                        alt={name}
                        className="w-11 h-11 rounded-full object-cover"/>
                    <div>
                        <p className="text-[#1A202C] font-semibold text-sm">{name}</p>
                        <p className="text-[#90A3BF] text-xs">{role}</p>
                    </div>
                </div>

                {/* Right */}
                <div className="flex flex-col items-end gap-1">
                    <span className="text-[#90A3BF] text-xs">{date}</span>
                    <div className="flex items-center gap-[2px]">
                        {renderStars(rating)}
                    </div>
                </div>
            </div>

            {/* Comment */}
            <p className="text-[#596780] text-sm leading-relaxed">
                {comment}
            </p>
        </div>
    );
};

export default ReviewCard;