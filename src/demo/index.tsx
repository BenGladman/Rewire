import * as React from "react";
import * as ReactDOM from "react-dom";
import { BoxDefinition, WireDefinition } from "../types";
import Rewire from "../components/Rewire";
import { squareJackType, arrowJackType } from "../components/JackType";

const initialBoxes: BoxDefinition[] = [
    {
        x: 50, y: 50, width: 100, height: 100,
        content: <div>Box A</div>,
        sockets: [
            { side: "right", pos: 0.2, type: arrowJackType },
            { side: "top", pos: 0, type: arrowJackType },
            { side: "bottom", pos: 0, type: arrowJackType },
            { side: "left", pos: 0.2, type: arrowJackType },
        ]
    },
    {
        x: 250, y: 250, width: 100, height: 100,
        content: <div>Box B</div>,
        sockets: [
            { side: "top", pos: 0, type: arrowJackType },
            { side: "bottom", pos: -0.2, type: arrowJackType },
            { side: "bottom", pos: 0.2, type: squareJackType },
        ]
    }
];

const initialWires: WireDefinition[] = [
    {
        jack1: { socket: initialBoxes[0].sockets[0], type: arrowJackType },
        jack2: { socket: initialBoxes[1].sockets[0], type: arrowJackType },
    },
    {
        jack1: { socket: initialBoxes[0].sockets[1], type: arrowJackType },
        jack2: { socket: initialBoxes[1].sockets[1], type: arrowJackType },
    },
    {
        jack1: { socket: initialBoxes[0].sockets[2], type: arrowJackType },
        jack2: { socket: initialBoxes[0].sockets[3], type: arrowJackType }
    }
];

const initData = {
    height: 600,
    width: 600,
    initialBoxes,
    initialWires,
};

ReactDOM.render(<Rewire {...initData} />, document.getElementById("rw-App"));