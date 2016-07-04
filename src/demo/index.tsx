import * as React from "react";
import * as ReactDOM from "react-dom";
import { BoxDefinition, WireDefinition } from "../types";
import Rewire from "../components/Rewire";
import { circleJackType, squareJackType, arrowJackType } from "../components/JackType";
import "./index.css";

const initialBoxes: BoxDefinition[] = [
    {
        x: 200, y: 100, width: 200, height: 50,
        content: <h1 className="demo-h1">Rewire!</h1>,
        sockets: [
            { side: "left", pos: -0.2, type: squareJackType },
            { side: "right", pos: 0.2, type: squareJackType },
            { side: "bottom", pos: 0, type: circleJackType },
        ]
    },
    {
        x: 50, y: 50, width: 100, height: 100,
        content: <p className="demo-p">A wiring UI written in React and Typescript</p>,
        sockets: [
            { side: "right", pos: 0, type: arrowJackType },
        ]
    }
];

const initialWires: WireDefinition[] = [
    {
        jack1: { socket: initialBoxes[0].sockets[0], type: squareJackType },
        jack2: { socket: initialBoxes[1].sockets[0], type: arrowJackType },
    }
];

const initData = {
    height: 600,
    width: 600,
    initialBoxes,
    initialWires,
};

ReactDOM.render(<Rewire {...initData} />, document.getElementById("rw-App"));