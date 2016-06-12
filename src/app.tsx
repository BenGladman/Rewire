import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Types from "./types";
import Replumb from "./components/Replumb";

const initialBoxes: Types.BoxDefinition[] = [
    { key: "B1", title: "Title A", x: 10, y: 10, width: 100, height: 100, content: <div>Box A</div> },
    { key: "B2", x: 120, y: 10, width: 100, height: 100, content: <div>Box B</div> }
];

const initialLines: Types.LineDefinition[] = [
    {
        key: "L1",
        endpoint1: { key: "E1", x: 10, y: 10, endpointType: "square" },
        endpoint2: { key: "F1", x: 50, y: 50, endpointType: "arrow" }
    },
    {
        key: "L2",
        endpoint1: { key: "E2", x: 100, y: 10, angle: 0, endpointType: "circle" },
        endpoint2: { key: "F2", x: 50, y: 150, angle: 90, endpointType: "arrow" }
    }
];

const initData = {
    heading: "myHeading",
    height: 600,
    width: 600,
    initialBoxes,
    initialLines,
};

ReactDOM.render(<Replumb {...initData} />, document.getElementById("PbApp"));