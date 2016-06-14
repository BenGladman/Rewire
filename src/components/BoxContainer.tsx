import * as React from "react";
import * as Types from "../types";
import Box from "./Box";

interface BoxContainerProps {
    boxes: Set<Types.BoxDefinition>;
    activeBox: Types.BoxDefinition;
}

export default function BoxContainer({boxes, activeBox}: BoxContainerProps) {
    const boxEls: JSX.Element[] = [];
    for (let box of boxes) {
        boxEls.push(<Box key={box.key} box={box} isActive={box === activeBox}/>);
    };

    return (
        <div className="pb-boxcontainer">
            {boxEls}
        </div>
    );
}