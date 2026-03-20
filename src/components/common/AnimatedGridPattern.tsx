"use client";

import { useEffect, useId, useRef, useState, type SVGProps } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface AnimatedGridPatternProps extends SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: number;
    numSquares?: number;
    className?: string;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
}

interface Square {
    id: number;
    pos: [number, number];
}

export default function AnimatedGridPattern({
    width = 18,
    height = 18,
    x = -1,
    y = -1,
    strokeDasharray = 0,
    numSquares = 50,
    className,
    maxOpacity = 0.5,
    duration = 4,
    repeatDelay = 0.5,
    ...props
}: AnimatedGridPatternProps) {
    const id = useId();
    const containerRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [squares, setSquares] = useState<Square[]>(() => generateSquares(numSquares));

    function getPos(): [number, number] {
        return [
            Math.floor((Math.random() * dimensions.width) / width),
            Math.floor((Math.random() * dimensions.height) / height),
        ];
    }

    // Adjust the generateSquares function to return objects with id, pos, and key
    function generateSquares(count: number): Square[] {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            pos: [0, 0] as [number, number], // Initial position, will be updated in useEffect
        }));
    }

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });
        }
    }, []);

    useEffect(() => {
        if (dimensions.width && dimensions.height) {
            setSquares(generateSquares(numSquares).map(sq => ({
                ...sq,
                pos: getPos(),
            })));
        }
    }, [dimensions, numSquares]);

    return (
        <svg
            ref={containerRef}
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5 ${height}V.5H${width}`}
                        fill="none"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id})`} />
            <svg x={x} y={y} className="overflow-visible">
                {squares.map(({ pos: [x, y], id }, index) => (
                    <motion.rect
                        initial={{ opacity: 0 }}
                        animate={{ opacity: maxOpacity }}
                        transition={{
                            duration,
                            repeat: Infinity,
                            delay: index * 0.1,
                            repeatType: "reverse",
                        }}
                        onAnimationComplete={() => {
                            setSquares((prevs) =>
                                prevs.map((sq) =>
                                    sq.id === id
                                        ? {
                                            ...sq,
                                            pos: getPos(),
                                        }
                                        : sq
                                )
                            );
                        }}
                        key={`${x}-${y}-${index}`}
                        width={width - 1}
                        height={height - 1}
                        x={x * width + 1}
                        y={y * height + 1}
                        fill="currentColor"
                        strokeWidth="0"
                    />
                ))}
            </svg>
        </svg>
    );
}
