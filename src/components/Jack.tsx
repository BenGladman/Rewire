import * as React from "react";
import * as Types from "../types";
import moveJack from "../actions/moveJack";
import setMouseMove from "../actions/setMouseMove";

interface JackProps {
    jack: Types.JackDefinition;
    angle: number;
}

export default function Jack({jack, angle}: JackProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const offsetX = x - ev.pageX;
        const offsetY = y - ev.pageY;

        const onMouseMove = (ev: React.MouseEvent) => {
            moveJack(jack, ev.pageX + offsetX, ev.pageY + offsetY);
        };

        setMouseMove(onMouseMove);

        // don't trigger on container
        ev.stopPropagation();

        // prevent text selection
        ev.preventDefault();
    };

    const JackProps = {
        className: "rw-jack",
        onMouseDown
    };

    const x = jack.x;
    const y = jack.y;
    const size = jack.size || 6;

    switch (jack.type) {
        case "circle":
            return (<circle {...JackProps} cx={x} cy={y} r={size} />);
        case "square":
            return (<rect {...JackProps} x={x - size} y={y - size} width={size * 2} height={size * 2} />);
        case "arrow":
            const points = `${x},${y - size} ${x + size},${y + size} ${x - size},${y + size}`;
            const transform = Math.abs(angle) < 1 ? null : `rotate (${angle} ${x} ${y})`;
            return (<polygon {...JackProps} points={points} transform={transform} />);
        default:
            return null;
    }
};