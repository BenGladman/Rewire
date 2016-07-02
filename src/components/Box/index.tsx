import * as React from "react";
import * as Types from "../../types";
import moveBox from "../../actions/moveBox";
import setActiveBox from "../../actions/setActiveBox";
import setMouseMove from "../../actions/setMouseMove";
import setTouchMove from "../../actions/setTouchMove";
import "./index.css";

interface BoxProps {
    key: string;
    box: Types.BoxDefinition;
    isActive: boolean;
}

export default function Box({box, isActive}: BoxProps) {
    const onMouseEnter = (ev: React.MouseEvent) => {
        setActiveBox(box);
    };

    const onMouseLeave = (ev: React.MouseEvent) => {
        setActiveBox(null);
    };

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

    const onTouchStart = (ev: React.TouchEvent) => {
        const touch = ev.touches[0];
        if (!touch) { return; }
        const offsetX = box.x - touch.pageX;
        const offsetY = box.y - touch.pageY;
        const onTouchMove = (ev: React.TouchEvent) => {
            const touch = ev.touches[0];
            if (!touch) { return; }
            moveBox(box, touch.pageX + offsetX, touch.pageY + offsetY);
        };
        setTouchMove(onTouchMove);

        // don't trigger on container
        ev.stopPropagation();
        // prevent text selection
        ev.preventDefault();
    };

    const headerEl = (box.title)
        ? <h3 className="rw-Box-header">{box.title}</h3>
        : null;

    return (
        <div className={"rw-Box" + (isActive ? " is-active" : "") }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            style={{ left: box.x, top: box.y, width: box.width, height: box.height }}>
            {headerEl}
            {box.content}
        </div>
    );
}