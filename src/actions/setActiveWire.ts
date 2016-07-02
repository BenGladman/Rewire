import { WireDefinition } from "../types";
import { setState } from "../store";

export default function (wire: WireDefinition) {
    setState({ activeWire: wire });
}