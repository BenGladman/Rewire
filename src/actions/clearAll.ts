import { getState, setState } from "../store";

export default function () {
    const { boxes, jacks, wires } = getState();

    boxes.clear();
    jacks.clear();
    wires.clear();

    setState({});
}