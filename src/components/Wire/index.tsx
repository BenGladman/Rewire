import * as React from "react";
import { Motion, spring } from "react-motion";
import { BoxDefinition, WireDefinition, JackDefinition } from "../../types";
import setActiveWire from "../../actions/setActiveWire";
import "./index.css";

const deg2rad = Math.PI / 180;

interface WireProps {
    key: string;
    wire: WireDefinition;
    straightness?: number;
    isActive: boolean;
    movingItem: BoxDefinition | JackDefinition;
}

export default function Wire({ wire, straightness = 100, isActive, movingItem }: WireProps) {
    const onMouseEnter = (ev: React.MouseEvent) => {
        if (!movingItem) { setActiveWire(wire); }
    };

    const onMouseLeave = (ev: React.MouseEvent) => {
        if (!movingItem) { setActiveWire(null); }
    };

    const isConnected = !!wire.jack1.socket && !!wire.jack2.socket;
    const className = "rw-Wire"
        + (isConnected ? " is-connected" : "")
        + (isActive ? " is-active" : "");

    const { jack1: {x: x1 = 0, y: y1 = 0, angle: angle1 = 0 }, jack2: {x: x2 = 0, y: y2 = 0, angle: angle2 = 0 }} = wire;

    const afunc = ({ x1, y1, angle1, x2, y2, angle2 }) => {
        const angle1rad = (angle1 * deg2rad);
        const angle2rad = (angle2 * deg2rad);

        const c1x = (x1 - straightness * Math.sin(angle1rad));
        const c1y = (y1 + straightness * Math.cos(angle1rad));
        const c2x = (x2 - straightness * Math.sin(angle2rad));
        const c2y = (y2 + straightness * Math.cos(angle2rad));
        const path = `M${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;

        return <path className={className} d={path}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave} />;
    };

    const jack1a = wire.jack1 === movingItem;
    const jack2a = wire.jack2 === movingItem;
    if (jack1a || jack2a) {
        const springConfig = { stiffness: 300, damping: 50 };
        const style = {
            x1: jack1a ? spring(x1, springConfig) : x1,
            y1: jack1a ? spring(y1, springConfig) : y1,
            angle1: jack1a ? spring(angle1, springConfig) : angle1,
            x2: jack2a ? spring(x2, springConfig) : x2,
            y2: jack2a ? spring(y2, springConfig) : y2,
            angle2: jack2a ? spring(angle2, springConfig) : angle2,
        };

        return (
            <Motion style={style}>
                {afunc}
            </Motion>
        );

    } else {
        return afunc({ x1, y1, angle1, x2, y2, angle2 });
    }
}