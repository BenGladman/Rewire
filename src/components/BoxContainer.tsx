import * as React from "react";
import * as Types from "../types";
import Box from "./Box";

interface BoxContainerProps {
    boxes: Map<string, Types.BoxDefinition>;
}

export default function BoxContainer({boxes}: BoxContainerProps) {
    const boxEls: JSX.Element[] = [];
    for (let [boxkey, box] of boxes) {
        boxEls.push(<Box key={boxkey} box={box} />);
    };

    return (
        <div className="pb-boxcontainer">
            {boxEls}
        </div>
    );
}