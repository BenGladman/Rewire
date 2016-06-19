import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Types from "./types";
import Rewire from "./components/Rewire";
import { arrowJackType } from "./components/JackType";

const initialBoxes: Types.BoxDefinition[] = [
    { key: "B1", title: "Title A", x: 10, y: 10, width: 100, height: 100, content: <div>Box A</div> },
    { key: "B2", x: 120, y: 10, width: 100, height: 100, content: <div>Box B</div> }
];

const initialJacks: Types.JackDefinition[] = [
    { key: "E1", box: { box: initialBoxes[0], side: "right" }, type: arrowJackType },
    { key: "E2", box: { box: initialBoxes[1], side: "left" }, type: arrowJackType },
    { key: "E3", box: { box: initialBoxes[0], side: "top" }, type: arrowJackType },
    { key: "E4", box: { box: initialBoxes[1], side: "top" }, type: arrowJackType },
    { key: "E5", box: { box: initialBoxes[0], side: "bottom" }, type: arrowJackType },
    { key: "E6", box: { box: initialBoxes[1], side: "bottom" }, type: arrowJackType }
];

const initialWires: Types.WireDefinition[] = [
    {
        key: "L1",
        jack1: initialJacks[0],
        jack2: initialJacks[1]
    },
    {
        key: "L2",
        jack1: initialJacks[2],
        jack2: initialJacks[3]
    },
    {
        key: "L3",
        jack1: initialJacks[4],
        jack2: initialJacks[5]
    }
];

const initData = {
    heading: "myHeading",
    height: 600,
    width: 600,
    initialBoxes,
    initialJacks,
    initialWires,
};

ReactDOM.render(<Rewire {...initData} />, document.getElementById("PbApp"));