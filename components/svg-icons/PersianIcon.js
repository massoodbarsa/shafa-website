"use client";
import React from "react";

export default function PersianIcon({ size = 24, color = "#C99745" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke={color}
        strokeWidth="14" // Balanced down slightly to keep complex overlaps crisp
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="256" cy="256" r="24" fill={color} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse
            key={a}
            cx="256"
            cy="155"
            rx="38"
            ry="98"
            transform={`rotate(${a} 256 256)`}
          />
        ))}
      </g>
    </svg>
  );
}
