import { getState, setState } from "../store";

export default function () {
    const { boxes, endpoints, lines } = getState();

    boxes.clear();
    endpoints.clear();
    lines.clear();

    setState({});
}