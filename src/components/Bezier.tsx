import * as React from "react";

const deg2rad = Math.PI / 180;

interface BezierProps {
    key: string;
    x1: number;
    y1: number;
    angle1?: number;
    x2: number;
    y2: number;
    angle2?: number;
    straightness?: number;
}

export default function Bezier ({x1, y1, angle1 = 0, x2, y2, angle2, straightness = 500}: BezierProps) {
    const angle1rad = (angle1 * deg2rad);
    const angle2rad = angle2 === undefined ? angle1 : (angle2 * deg2rad);

    const xdist = Math.min(straightness, Math.abs(x1 - x2));
    const ydist = Math.min(straightness, Math.abs(y1 - y2));
    const c1x = x1 + xdist * Math.cos(angle1rad);
    const c1y = y1 + ydist * Math.sin(angle1rad);
    const c2x = x2 + xdist * Math.cos(angle2rad);
    const c2y = y2 + ydist * Math.sin(angle2rad);
    const path = `M${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
    return (<path className="pb-line" d={path} />);
}