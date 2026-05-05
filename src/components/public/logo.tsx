"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  src?: string;
};

/**
 * PRVS Business logo.
 *
 * Tries to load the real logo from /logo.png (in public/).
 * Falls back to an inline SVG approximation if the file is missing.
 */
export function Logo({ className, src = "/logo.png" }: Props) {
  const [errored, setErrored] = useState(false);

  if (!errored) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt="PRVS Business — Think Different, Start a Business"
        onError={() => setErrored(true)}
        className={cn("h-9 lg:h-11 w-auto", className)}
      />
    );
  }

  // Fallback inline SVG (approximation of the original logo)
  return (
    <svg
      viewBox="0 0 280 64"
      role="img"
      aria-label="PRVS Business"
      className={cn("h-9 lg:h-11 w-auto", className)}
    >
      {/* Orange flame */}
      <path
        d="M22 8 C 14 18, 12 30, 18 42 C 22 50, 28 54, 32 56 C 28 48, 26 38, 30 28 C 32 22, 28 14, 22 8 Z"
        fill="#f97316"
      />
      {/* Teal flame */}
      <path
        d="M38 8 C 34 14, 30 22, 32 30 C 34 40, 38 50, 36 56 C 42 52, 48 46, 52 36 C 56 24, 50 14, 38 8 Z"
        fill="#1d7a8c"
      />
      {/* PRVS BUSINESS */}
      <text
        x="68"
        y="32"
        fontFamily="system-ui, sans-serif"
        fontWeight="800"
        fontSize="20"
        fill="#dc2626"
        letterSpacing="0.5"
      >
        PRVS BUSINESS
      </text>
      {/* STARTUP MINDS */}
      <text
        x="220"
        y="14"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fontSize="7"
        fill="#1d7a8c"
        letterSpacing="0.5"
      >
        STARTUP MINDS
      </text>
      {/* Tagline */}
      <text
        x="68"
        y="48"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="500"
        fontSize="10"
        fill="#dc2626"
      >
        Think Different · Start a Business
      </text>
    </svg>
  );
}
