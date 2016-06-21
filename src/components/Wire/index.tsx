import * as React from "react";
import "./index.css";

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
    isConnected?: boolean;
}

export default function Wire({x1, y1, angle1 = 0, x2, y2, angle2 = 0, straightness = 100, isConnected}: BezierProps) {
    const className = "rw-Wire" + (isConnected ? " is-connected" : "");

    const angle1rad = (angle1 * deg2rad);
    const angle2rad = (angle2 * deg2rad);

    const c1x = (x1 - straightness * Math.sin(angle1rad));
    const c1y = (y1 + straightness * Math.cos(angle1rad));
    const c2x = (x2 - straightness * Math.sin(angle2rad));
    const c2y = (y2 + straightness * Math.cos(angle2rad));
    const path = `M${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

    return (<path className={className} d={path} />);
}