import { getState, setState } from "../store";
import objectAssign = require("object-assign");

interface LineProperties {
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
}

export default function (last: boolean, lineId: number, lineProps: LineProperties) {
    const { lines } = getState();

    const lineIdU = last ? lines.length - 1 : lineId;

    objectAssign(lines[lineIdU], lineProps);

    setState({ lines });
};