import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Types from "./types";
import Replumb from "./components/Replumb";

const initialBoxes: Types.BoxDefinition[] = [
    { key: "B1", title: "Title A", x: 10, y: 10, width: 100, height: 100, content: <div>Box A</div> },
    { key: "B2", x: 120, y: 10, width: 100, height: 100, content: <div>Box B</div> }
];

const initialEndpoints: Types.EndpointDefinition[] = [
    { key: "E1", box: { box: initialBoxes[0], side: "right" }, endpointType: "arrow" },
    { key: "E2", box: { box: initialBoxes[1], side: "left" }, endpointType: "arrow" },
    { key: "E3", box: { box: initialBoxes[0], side: "top" }, endpointType: "arrow" },
    { key: "E4", box: { box: initialBoxes[1], side: "top" }, endpointType: "arrow" },
    { key: "E5", box: { box: initialBoxes[0], side: "bottom" }, endpointType: "arrow" },
    { key: "E6", box: { box: initialBoxes[1], side: "bottom" }, endpointType: "arrow" }
];

const initialLines: Types.LineDefinition[] = [
    {
        key: "L1",
        endpoint1: initialEndpoints[0],
        endpoint2: initialEndpoints[1]
    },
    {
        key: "L2",
        endpoint1: initialEndpoints[2],
        endpoint2: initialEndpoints[3]
    },
    {
        key: "L3",
        endpoint1: initialEndpoints[4],
        endpoint2: initialEndpoints[5]
    }
];

const initData = {
    heading: "myHeading",
    height: 600,
    width: 600,
    initialBoxes,
    initialEndpoints,
    initialLines,
};

ReactDOM.render(<Replumb {...initData} />, document.getElementById("PbApp"));