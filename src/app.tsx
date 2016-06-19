import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Types from "./types";
import Rewire from "./components/Rewire";
import { squareJackType, arrowJackType } from "./components/JackType";

const initialBoxes: Types.BoxDefinition[] = [
    { key: "B0", title: "Title A", x: 10, y: 10, width: 100, height: 100, content: <div>Box A</div> },
    { key: "B1", x: 120, y: 10, width: 100, height: 100, content: <div>Box B</div> }
];

const initialSockets: Types.SocketDefinition[] = [
    { key: "S0", box: initialBoxes[0], side: "right", pos: 0.2, type: arrowJackType },
    { key: "S1", box: initialBoxes[0], side: "top", pos: 0, type: arrowJackType },
    { key: "S2", box: initialBoxes[0], side: "bottom", pos: 0, type: arrowJackType },
    { key: "S3", box: initialBoxes[1], side: "left", pos: 0.2, type: arrowJackType },
    { key: "S4", box: initialBoxes[1], side: "top", pos: 0, type: arrowJackType },
    { key: "S5", box: initialBoxes[1], side: "bottom", pos: -0.2, type: arrowJackType },
    { key: "S6", box: initialBoxes[1], side: "bottom", pos: 0.2, type: squareJackType },
];

const initialJacks: Types.JackDefinition[] = [
    { key: "E0", socket: initialSockets[0], type: arrowJackType },
    { key: "E1", socket: initialSockets[3], type: arrowJackType },
    { key: "E2", socket: initialSockets[1], type: arrowJackType },
    { key: "E3", socket: initialSockets[4], type: arrowJackType },
    { key: "E4", socket: initialSockets[2], type: arrowJackType },
    { key: "E5", socket: initialSockets[5], type: arrowJackType }
];

const initialWires: Types.WireDefinition[] = [
    {
        key: "L0",
        jack1: initialJacks[0],
        jack2: initialJacks[1]
    },
    {
        key: "L1",
        jack1: initialJacks[2],
        jack2: initialJacks[3]
    },
    {
        key: "L2",
        jack1: initialJacks[4],
        jack2: initialJacks[5]
    }
];

const initData = {
    heading: "myHeading",
    height: 600,
    width: 600,
    initialBoxes,
    initialSockets,
    initialJacks,
    initialWires,
};

ReactDOM.render(<Rewire {...initData} />, document.getElementById("PbApp"));