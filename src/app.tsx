import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Types from "./types";
import Replumb from "./components/Replumb";

const initialBoxes: Types.BoxDefinition[] = [
    { id: "A", title: "Title A", x: 10, y: 10, width: 100, height: 100, content: <div>Box A</div> },
    { id: "B", x: 120, y: 10, width: 100, height: 100, content: <div>Box B</div> }
];

const initialLines: Types.LineDefinition[] = [
    { x1: 10, y1: 10, endpointType1: "square", x2: 50, y2: 50, endpointType2: "arrow" },
    { x1: 100, y1: 10, angle1: 0, endpointType1: "circle", x2: 50, y2: 150, angle2: 90, endpointType2: "arrow" }
];

const initData = {
    heading: "myHeading",
    height: 600,
    width: 600,
    initialBoxes,
    initialLines,
};

ReactDOM.render(<Replumb {...initData} />, document.getElementById("PbApp"));