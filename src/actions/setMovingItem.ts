import { BoxDefinition, WireDefinition, JackDefinition } from "../types";
import { setState } from "../store";

export default function (box: BoxDefinition, wire: WireDefinition, jack: JackDefinition) {
    setState({
        movingItem: box || jack,
        activeBox: box,
        activeWire: wire,
        activeJack: jack
    });
}