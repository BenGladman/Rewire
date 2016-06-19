import * as Types from "../types";
import nextKey from "./nextKey";
import { getState, setState } from "../store";
import { squareJackType, arrowJackType } from "../components/JackType";

export default function (x1: number, y1: number, x2: number, y2: number) {
    const { jacks, wires } = getState();

    const jack1: Types.JackDefinition = {
        key: nextKey(), x: x1, y: y1, type: squareJackType
    };

    const jack2: Types.JackDefinition = {
        key: nextKey(), x: x2, y: y2, type: arrowJackType
    };

    const wire: Types.WireDefinition = {
        key: nextKey(),
        jack1,
        jack2
    };

    jacks.add(jack1);
    jacks.add(jack2);
    wires.add(wire);
    setState({});

    return wire;
}