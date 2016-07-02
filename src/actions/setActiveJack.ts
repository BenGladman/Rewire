import { JackDefinition } from "../types";
import { setState } from "../store";

export default function (jack: JackDefinition) {
    setState({ activeJack: jack });
}