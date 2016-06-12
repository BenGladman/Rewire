import * as React from "react";
import * as Types from "../types";
import setMouseMove from "../actions/setMouseMove";
import moveBox from "../actions/moveBox";

interface BoxProps {
    box: Types.BoxDefinition;
}

export default function Box({box}: BoxProps) {
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

    return (
        <div className="pb-box"
            style={{ left: box.x, top: box.y, width: box.width, height: box.height }}>
            <h3 className="pb-boxheader" onMouseDown={onMouseDown}>{box.title}</h3>
            {box.content}
        </div>
    );
}