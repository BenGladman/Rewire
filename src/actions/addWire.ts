import * as Types from "../types";
import nextKey from "./nextKey";
import { getState, setState } from "../store";

export default function (x1: number, y1: number, x2: number, y2: number) {
    const { wires } = getState();

    const newWire: Types.WireDefinition = {
        key: nextKey(),
        jack1: { key: nextKey(), x: x1, y: y1, type: "arrow" },
        jack2: { key: nextKey(), x: x2, y: y2, type: "arrow" }
    };

    wires.add(newWire);
    setState({ wires });

    return newWire;
}