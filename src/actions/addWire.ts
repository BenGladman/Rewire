import * as Types from "../types";
import { getState, setState } from "../store";
import { squareJackType, arrowJackType } from "../components/JackType";

export default function (x1: number, y1: number, x2: number, y2: number) {
    const { wires } = getState();

    const wire: Types.WireDefinition = {
        jack1: { x: x1, y: y1, type: squareJackType },
        jack2: { x: x2, y: y2, type: arrowJackType }
    };

    wires.add(wire);
    setState({});

    return wire;
}