import { setState } from "../store";
import * as Types from "../types";

export default function moveBox(box: Types.BoxDefinition, x: number, y: number) {
    box.x = x;
    box.y = y;
    setState({ animatingJack: null });
}