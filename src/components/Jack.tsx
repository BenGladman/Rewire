import * as React from "react";
import * as Types from "../types";
import moveJack from "../actions/moveJack";
import setMouseMove from "../actions/setMouseMove";

interface JackProps {
    jack: Types.JackDefinition;
}

export default function Jack({jack}: JackProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const offsetX = jack.x - ev.pageX;
        const offsetY = jack.y - ev.pageY;

        const onMouseMove = (ev: React.MouseEvent) => {
            moveJack(jack, ev.pageX + offsetX, ev.pageY + offsetY);
        };

        setMouseMove(onMouseMove);

        // don't trigger on container
        ev.stopPropagation();

        // prevent text selection
        ev.preventDefault();
    };

    return jack.type({
        x: jack.x,
        y: jack.y,
        angle: jack.angle || 0,
        size: 6,
        className: "rw-jack" + (jack.box ? " rw-jack-connected" : ""),
        onMouseDown
    });
};