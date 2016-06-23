import { getState, setState } from "../store";

export default function () {
    const { boxes, wires } = getState();

    boxes.clear();
    wires.clear();

    setState({});
}