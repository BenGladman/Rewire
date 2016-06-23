import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Types from "./types";
import Rewire from "./components/Rewire";
import { squareJackType, arrowJackType } from "./components/JackType";

const sockets: Types.SocketDefinition[] = [
    { key: "S0", side: "right", pos: 0.2, type: arrowJackType },
    { key: "S1", side: "top", pos: 0, type: arrowJackType },
    { key: "S2", side: "bottom", pos: 0, type: arrowJackType },
    { key: "S3", side: "left", pos: 0.2, type: arrowJackType },
    { key: "S4", side: "top", pos: 0, type: arrowJackType },
    { key: "S5", side: "bottom", pos: -0.2, type: arrowJackType },
    { key: "S6", side: "bottom", pos: 0.2, type: squareJackType },
];

const jacks: Types.JackDefinition[] = [
    { key: "J0", socket: sockets[0], type: arrowJackType },
    { key: "J1", socket: sockets[3], type: arrowJackType },
    { key: "J2", socket: sockets[1], type: arrowJackType },
    { key: "J3", socket: sockets[4], type: arrowJackType },
    { key: "J4", socket: sockets[2], type: arrowJackType },
    { key: "J5", socket: sockets[5], type: arrowJackType }
];

const initialBoxes: Types.BoxDefinition[] = [
    { key: "B0", title: "Title A", x: 10, y: 10, width: 100, height: 100, content: <div>Box A</div>, sockets: sockets.slice(0, 3) },
    { key: "B1", x: 120, y: 10, width: 100, height: 100, content: <div>Box B</div>, sockets: sockets.slice(3, 7) }
];

const initialWires: Types.WireDefinition[] = [
    { key: "W0", jack1: jacks[0], jack2: jacks[1] },
    { key: "W1", jack1: jacks[2], jack2: jacks[3] },
    { key: "W2", jack1: jacks[4], jack2: jacks[5] }
];

const initData = {
    heading: "myHeading",
    height: 600,
    width: 600,
    initialBoxes,
    initialWires,
};

ReactDOM.render(<Rewire {...initData} />, document.getElementById("RwApp"));