import * as React from "react";

interface StraightProps {
    key: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export default function Straight({x1, y1, x2, y2}: StraightProps) {
    return (
        <line className="pb-line"
            x1={x1} y1={y1}
            x2={x2} y2={y2} />
    );
}