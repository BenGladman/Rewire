import { getState, setState } from "../store";

export default function addLine(x1: number, y1: number, x2: number, y2: number) {
    const { lines } = getState();

    lines.push({
        x1, y1, endpointType1: "arrow",
        x2, y2, endpointType2: "arrow"
    });

    setState({ lines });
}