import React from 'react';

const CircularProgress = ({ score, total }) => {
    const radius = 70;
    const strokeWidth = 8;
    const normalizedRadius = radius - strokeWidth * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - score / total * circumference;

    return (
        <svg
            height={radius * 2}
            width={radius * 2}
        >
            <circle
                stroke="#ddd"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <circle
                stroke="#4caf50"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference + ' ' + circumference}
                style={{ strokeDashoffset: 0, transition: 'stroke-dashoffset 1s ease-out' }}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                stroke="#4caf50"
                strokeWidth="2px"
                dy=".3em"
            >
                {`${score}/${total}`}
            </text>
        </svg>
    );
};

export default CircularProgress;
