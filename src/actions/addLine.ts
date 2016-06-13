import * as Types from "../types";
import nextKey from "./nextKey";
import { getState, setState } from "../store";

export default function addLine(x1: number, y1: number, x2: number, y2: number) {
    const { lines } = getState();

    const newLine: Types.LineDefinition = {
        key: nextKey(),
        endpoint1: { key: nextKey(), x: x1, y: y1, endpointType: "arrow" },
        endpoint2: { key: nextKey(), x: x2, y: y2, endpointType: "arrow" }
    };

    lines.push(newLine);
    setState({ lines });

    return newLine;
}