import * as React from "react";
import * as Types from "../../types";
import "./index.css";

const deg2rad = Math.PI / 180;

interface WireProps {
    key: string;
    wire: Types.WireDefinition;
    straightness?: number;
}

export default function Wire({ wire, straightness = 100}: WireProps) {
    const isConnected = !!wire.jack1.socket && !!wire.jack2.socket;
    const className = "rw-Wire" + (isConnected ? " is-connected" : "");

    const { jack1: {x: x1, y: y1, angle: angle1 = 0 }, jack2: {x: x2, y: y2, angle: angle2 = 0 }} = wire;

    const angle1rad = (angle1 * deg2rad);
    const angle2rad = (angle2 * deg2rad);

    const c1x = (x1 - straightness * Math.sin(angle1rad));
    const c1y = (y1 + straightness * Math.cos(angle1rad));
    const c2x = (x2 - straightness * Math.sin(angle2rad));
    const c2y = (y2 + straightness * Math.cos(angle2rad));
    const path = `M${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

    return (<path className={className} d={path} />);
}