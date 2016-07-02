import { getState, setState } from "../store";
import * as Types from "../types";
import { clamp } from "../util/mathUtil";

export default function moveBox(box: Types.BoxDefinition, x: number, y: number) {
    const { width, height } = getState();
    box.x = clamp(x, 0, width - box.width);
    box.y = clamp(y, 0, height - box.height);
    setState({ animatingJack: null });
}