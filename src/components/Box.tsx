import * as React from "react";
import * as Types from "../types";
import moveBox from "../actions/moveBox";
import setActiveBox from "../actions/setActiveBox";
import setMouseMove from "../actions/setMouseMove";

interface BoxProps {
    box: Types.BoxDefinition;
    isActive: boolean;
}

export default function Box({box, isActive}: BoxProps) {
    const onMouseDown = (ev: React.MouseEvent) => {
        const offsetX = box.x - ev.pageX;
        const offsetY = box.y - ev.pageY;

        const onMouseMove = (ev: React.MouseEvent) => {
            moveBox(box, ev.pageX + offsetX, ev.pageY + offsetY);
        };

        setMouseMove(onMouseMove);

        // don't trigger on container
        ev.stopPropagation();

        // prevent text selection
        ev.preventDefault();
    };

    const onMouseEnter = (ev: React.MouseEvent) => {
        setActiveBox(box);
    };

    const onMouseLeave = (ev: React.MouseEvent) => {
        setActiveBox(null);
    };

    const headerEl = (box.title)
        ? <h3 className="rw-boxheader">{box.title}</h3>
        : null;


    return (
        <div className={"rw-box" + (isActive ? " rw-box-active" : "") }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            style={{ left: box.x, top: box.y, width: box.width, height: box.height }}>
            {headerEl}
            {box.content}
        </div>
    );
}