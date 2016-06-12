import * as uuid from "node-uuid";
import * as Types from "../types";
import { getState, setState } from "../store";

export default function addLine(x1: number, y1: number, x2: number, y2: number) {
    const { lines } = getState();

    const newLine: Types.LineDefinition = {
        key: uuid.v4(),
        endpoint1: { key: uuid.v4(), x: x1, y: y1, endpointType: "arrow" },
        endpoint2: { key: uuid.v4(), x: x2, y: y2, endpointType: "arrow" }
    };

    lines.push(newLine);
    setState({ lines });

    return newLine;
}