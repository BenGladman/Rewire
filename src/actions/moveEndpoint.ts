import { getState, setState } from "../store";

export default function moveEndpoint(last: boolean, lineId: number, lineEnd: number, newX: number, newY: number) {
    const { lines } = getState();

    const lineIdU = last ? lines.length - 1 : lineId;
    lines[lineIdU][`x${lineEnd}`] = newX;
    lines[lineIdU][`y${lineEnd}`] = newY;

    setState({ lines });
};