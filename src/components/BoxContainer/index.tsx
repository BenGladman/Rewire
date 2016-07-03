import * as React from "react";
import { BoxDefinition, JackDefinition } from "../../types";
import Box from "../Box";
import "./index.css";

interface BoxContainerProps {
    boxes: Set<BoxDefinition>;
    activeBox: BoxDefinition;
    movingItem: BoxDefinition | JackDefinition;
}

export default function BoxContainer({ boxes, activeBox, movingItem }: BoxContainerProps) {
    const boxEls: JSX.Element[] = [];
    const movingBox = boxes.has(movingItem as BoxDefinition);

    for (let box of boxes) {
        boxEls.push(<Box key={box.key} box={box} isActive={box === activeBox} movingBox={movingBox} />);
    };

    return (
        <div className="rw-BoxContainer">
            {boxEls}
        </div>
    );
}