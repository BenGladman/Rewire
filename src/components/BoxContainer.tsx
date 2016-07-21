import * as React from "react";
import { BoxDefinition, JackDefinition } from "../types";
import Box from "./Box";
import "./BoxContainer.css";

interface Props {
    boxes: Set<BoxDefinition>;
    activeBox: BoxDefinition;
    movingItem: BoxDefinition | JackDefinition;
}

type Component = React.StatelessComponent<Props>;

const component: Component = ({ boxes, activeBox, movingItem }) => {
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
};

component.displayName = "BoxContainer";
export default component;