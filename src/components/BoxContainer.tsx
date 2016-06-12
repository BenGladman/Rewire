import * as React from "react";
import * as Types from "../types";
import Box from "./Box";

interface BoxContainerProps {
    boxes: Set<Types.BoxDefinition>;
}

export default function BoxContainer ({boxes}: BoxContainerProps) {
    const boxEls: JSX.Element[] = [];
    boxes.forEach((box) => boxEls.push(<Box box={box} />));

    return (
        <div className="pb-boxcontainer">
            {boxEls}
        </div>
    );
}