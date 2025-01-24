import { Compass, MessageCircle, PenTool } from "lucide-react";
import React from "react";
import { useId } from "react";

export function FeaturesSection() {
    return (
        (<div className="py-10">
            <div
                className="grid md:grid-cols-3 gap-8 mx-auto text-left">
                {grid.map((feature) => (
                    <div
                        key={feature.title}
                        className={`relative bg-gradient-to-b dark:from-neutral-900 from-indigo-50 dark:to-neutral-900 to-white p-6 rounded-xl overflow-hidden shadow`}>
                        <Grid size={20} />
                        <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                        <p
                            className="text-xl font-bold text-neutral-800 dark:text-white relative z-20">
                            {feature.title}
                        </p>
                        <p
                            className="text-muted-foreground mt-4 text-base font-normal relative z-20">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>)
    );
}

const grid = [
    {
        icon: PenTool,
        title: "Write and Share",
        description: "Create captivating blogs and share your thoughts with the world.",
        color: "text-purple-500 dark:text-purple-400",
    },
    {
        icon: MessageCircle,
        title: "Engage in Discussions",
        description: "Connect with other users by sharing thoughts through comments on blogs.",
        color: "text-blue-500 dark:text-blue-400",
    },
    {
        icon: Compass,
        title: "Explore Blogs",
        description: "Discover a variety of blogs across different topics on the explore page.",
        color: "text-green-500 dark:text-green-400",
    },
];


export const Grid = ({
    pattern,
    size
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        (<div
            className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div
                className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10" />
            </div>
        </div>)
    );
};

export function GridPattern({
    width,
    height,
    x,
    y,
    squares,
    ...props
}) {
    const patternId = useId();

    return (
        (<svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y], i) => (
                        <rect
                            strokeWidth="0"
                            key={i}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height} />
                    ))}
                </svg>
            )}
        </svg>)
    );
}
