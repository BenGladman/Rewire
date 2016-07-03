import * as React from "react";
import { BoxDefinition, mouseHandler, touchHandler } from "../../types";
import moveBox from "../../actions/moveBox";
import setActiveBox from "../../actions/setActiveBox";
import setMouseMove from "../../actions/setMouseMove";
import setTouchMove from "../../actions/setTouchMove";
import setMovingItem from "../../actions/setMovingItem";
import "./index.css";

interface BoxProps {
    key: string;
    box: BoxDefinition;
    isActive: boolean;
    movingBox: boolean;
}

export default function Box({ box, isActive, movingBox }: BoxProps) {
    const onMouseEnter: mouseHandler = (ev) => {
        if (!movingBox) { setActiveBox(box); }
    };

    const onMouseLeave: mouseHandler = (ev) => {
        if (!movingBox) { setActiveBox(null); }
    };

    const onMouseDown: mouseHandler = (ev) => {
        const offsetX = box.x - ev.pageX;
        const offsetY = box.y - ev.pageY;
        const onMouseMove: mouseHandler = (ev) => {
            moveBox(box, ev.pageX + offsetX, ev.pageY + offsetY);
        };
        const onMouseUp: mouseHandler = (ev) => {
            setMovingItem(null, null, null);
        };
        setMovingItem(box, null, null);
        setMouseMove(onMouseMove, onMouseUp);

        // don't trigger on container
        ev.stopPropagation();
        // prevent text selection
        ev.preventDefault();
    };

    const onTouchStart: touchHandler = (ev) => {
        const touch = ev.touches[0];
        if (!touch) { return; }
        const offsetX = box.x - touch.pageX;
        const offsetY = box.y - touch.pageY;
        const onTouchMove: touchHandler = (ev) => {
            const touch = ev.touches[0];
            if (!touch) { return; }
            moveBox(box, touch.pageX + offsetX, touch.pageY + offsetY);
        };
        const onTouchEnd: touchHandler = (ev) => {
            setMovingItem(null, null, null);
        };
        setMovingItem(box, null, null);
        setTouchMove(onTouchMove, onTouchEnd);

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