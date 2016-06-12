import { getState, setState } from "../store";

export default function () {
    const { boxes, lines } = getState();

    boxes.clear();
    lines.length = 0;

    setState({
        boxes,
        lines
    });
}