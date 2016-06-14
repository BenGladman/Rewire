import * as Types from "../types";
import { setState } from "../store";

export default function (box: Types.BoxDefinition) {
    setState({ activeBox: box });
}