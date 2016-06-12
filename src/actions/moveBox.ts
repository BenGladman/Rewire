import { getState, setState } from "../store";
import * as Types from "../types";

export default function moveBox(box: Types.BoxDefinition, x: number, y: number) {
    const { boxes } = getState();
    box.x = x;
    box.y = y;
    boxes.add(box);
    setState({ boxes });
}